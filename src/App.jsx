// src/App.js

import React, { useState, useEffect, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const App = () => {
    // State for managing messages, input, username, and connection status
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const [username, setUsername] = useState('');
    const [isConnected, setIsConnected] = useState(false);

    // Use a ref to hold the stomp client instance
    // This prevents it from being recreated on every render
    const clientRef = useRef(null);

    // Effect for cleaning up the connection when the component unmounts
    useEffect(() => {
        // The return function from useEffect is called on component unmount
        return () => {
            if (clientRef.current && clientRef.current.active) {
                console.log("Deactivating client");
                clientRef.current.deactivate();
            }
        };
    }, []);

    // Function to handle incoming messages from the WebSocket
    const onMessageReceived = (payload) => {
        const message = JSON.parse(payload.body);
        console.log("New message received:", message);
        // Update the messages state with the new message
        setMessages(prevMessages => [...prevMessages, message]);
    };

    // Main connection logic
    const connect = () => {
        if (!username.trim()) {
            alert("Please enter a username.");
            return;
        }

        // 1. Fetch chat history first
        fetch('http://localhost:8080/messages')
            .then(response => response.json())
            .then(history => {
                setMessages(history);

                // 2. Create and configure the Stomp client
                const client = new Client({
                    webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
                    reconnectDelay: 5000,
                    debug: (str) => {
                        console.log(new Date(), str);
                    },
                    onConnect: (frame) => {
                        console.log('Connected: ' + frame);
                        setIsConnected(true);

                        // Subscribe to the public topic to receive messages
                        client.subscribe('/topic/public', onMessageReceived);

                        // Announce that a new user has joined
                        client.publish({
                            destination: '/app/chat.addUser',
                            body: JSON.stringify({ sender: username, type: 'JOIN' }),
                        });
                    },
                    onStompError: (frame) => {
                        console.error('Broker reported error: ' + frame.headers['message']);
                        console.error('Additional details: ' + frame.body);
                    },
                    onDisconnect: () => {
                        console.log("Disconnected!");
                        setIsConnected(false);
                    }
                });

                // 3. Activate the client and store it in the ref
                client.activate();
                clientRef.current = client;

            })
            .catch(error => console.error('Could not fetch history or connect:', error));
    };

    // Function to send a chat message
    const sendMessage = (event) => {
        event.preventDefault();
        if (messageInput.trim() && clientRef.current && isConnected) {
            const chatMessage = {
                sender: username,
                content: messageInput,
                type: 'CHAT'
            };
            // Publish the message to the server
            clientRef.current.publish({
                destination: "/app/chat.sendMessage",
                body: JSON.stringify(chatMessage)
            });
            // Clear the input field after sending
            setMessageInput('');
        }
    };

    // Render the username input form if not connected
    if (!isConnected) {
        return (
            <div id="username-page">
                <div className="username-page-container">
                    <h1>Enter your username</h1>
                    <form onSubmit={(e) => { e.preventDefault(); connect(); }}>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                            autoComplete="off"
                        />
                        <button type="submit">Start Chatting</button>
                    </form>
                </div>
            </div>
        );
    }

    // Render the main chat interface if connected
    return (
        <div id="chat-page">
            <div className="chat-container">
                <div className="chat-header">
                    <h2>Real-time Chat with History</h2>
                </div>
                <ul id="messageArea">
                    {messages.map((msg, index) => (
                        <li key={index} className={msg.type === 'JOIN' || msg.type === 'LEAVE' ? 'event-message' : 'chat-message'}>
                            {msg.type !== 'CHAT' ? (
                                <p>{msg.sender} {msg.type === 'JOIN' ? 'joined!' : 'left!'}</p>
                            ) : (
                                <>
                                    <span style={{ fontWeight: 'bold' }}>{msg.sender}</span>
                                    <p>{msg.content}</p>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
                <form id="messageForm" name="messageForm" onSubmit={sendMessage}>
                    <div className="form-group">
                        <div className="input-group clearfix">
                            <input
                                type="text"
                                value={messageInput}
                                onChange={(e) => setMessageInput(e.target.value)}
                                placeholder="Type a message..."
                                autoComplete="off"
                                className="form-control"
                            />
                            <button type="submit" className="primary">Send</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default App;