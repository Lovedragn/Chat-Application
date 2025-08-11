# Real-Time Chat Application with Spring Boot and React

This is a full-stack, real-time chat application built with a Spring Boot backend and a React frontend. It uses WebSockets for instant two-way communication and a SQL database to persist and retrieve chat history.

![Chat Application Demo](https://placehold.co/800x400/333/FFF?text=Chat+App+Screenshot)

---

## ✨ Features

-   **Real-Time Messaging:** Send and receive messages instantly without refreshing the page, powered by WebSockets and STOMP.
-   **Public Chat Room:** A single, public chat room where all connected users can interact.
-   **Message History:** Chat messages are saved to a database and loaded for new users, providing context.
-   **User Join/Leave Notifications:** See when users join or leave the chat in real-time.
-   **Responsive UI:** A clean and simple user interface built with React.

---

## 🛠️ Tech Stack

### Backend
-   **Java 17**
-   **Spring Boot 3**
-   **Spring WebSocket:** For STOMP-based messaging.
-   **Spring Data JPA:** For database interaction.
-   **H2 Database:** An in-memory SQL database for easy setup and development.
-   **Maven:** For dependency management.

### Frontend
-   **React 18**
-   **Vite:** As the frontend build tool.
-   **@stomp/stompjs:** Modern STOMP client for WebSocket communication.
-   **SockJS-Client:** For WebSocket fallback options.
-   **CSS:** For basic styling.

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing.

### Prerequisites

Make sure you have the following software installed:
-   **JDK 17** or later
-   **Apache Maven**
-   **Node.js** and **npm**

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
    cd your-repo-name
    ```

2.  **Backend Setup (Spring Boot):**
    -   Navigate to the backend project directory (e.g., `backend/`).
    -   Let Maven download the dependencies. If you're using an IDE like IntelliJ IDEA, it will do this automatically. Otherwise, run:
        ```sh
        mvn clean install
        ```

3.  **Frontend Setup (React):**
    -   Navigate to the frontend project directory (e.g., `frontend/`).
    -   Install the npm packages:
        ```sh
        npm install
        ```

---

## 🏃‍♀️ Running the Application

You need to start both the backend and frontend servers.

1.  **Start the Backend Server:**
    -   In the backend directory, run the Spring Boot application:
        ```sh
        mvn spring-boot:run
        ```
    -   The server will start on `http://localhost:8080`.

2.  **Start the Frontend Server:**
    -   In a **new terminal**, navigate to the frontend directory and run the React development server:
        ```sh
        npm run dev
        ```
    -   The application will be available at `http://localhost:5173`.

3.  **Access the Application:**
    -   Open your web browser and go to **`http://localhost:5173`**.
    -   Enter a username to join the chat. Open multiple browser tabs to simulate different users.

---

## 📁 Project Structure


.
├── backend/                  # Spring Boot Backend
│   ├── src/main/java/com/example/chat/
│   │   ├── model/
│   │   ├── controller/
│   │   ├── repository/
│   │   └── config/
│   └── pom.xml
│
└── frontend/                 # React Frontend
├── src/
│   ├── components/
│   └── App.jsx
├── package.json
└── vite.config.js


---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
