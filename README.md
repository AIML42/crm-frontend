# Hubly Frontend

## 🚀 Overview

The Hubly frontend is a **React-based web application** designed to provide a CRM platform for managing leads, teams, and chats. It includes a landing page with an interactive chatbot, a dashboard with sidebar navigation, and various pages for managing teams, users, and chatbot configurations.

---

## ✨ Features

- **Landing Page**:
  - A marketing section showcasing Hubly CRM's benefits.
  - An interactive chatbot widget for visitor engagement.
- **Dashboard**:
  - Sidebar navigation with links to Teams, Chatbot Configuration, and Edit Profile pages.
  - **Team Management**: Add, edit, and delete team members.
  - **Chatbot Configuration**: Customize welcome messages, colors, introduction forms, and more.
  - **Edit Profile**: Update user details (first name, email, password) with automatic logout on email/password changes.
- **Chatbot**:
  - Collapsible widget on the landing page.
  - Displays a welcome message, collects user info via an introduction form, and allows messaging.
  - Polls the backend for chat updates every 3 seconds.
- **Authentication**:
  - Login page with token-based authentication.
  - Protected routes for authenticated users.

---

## 🛠️ Tech Stack

- **React**: Frontend framework for building the UI.
- **Redux Toolkit**: State management for user auth, team data, and chats.
- **React Router**: Client-side routing.
- **Axios**: API requests to the backend.
- **React Toastify**: Success/error notifications.
- **Iconify**: Icons used throughout the app.
- **CSS**: Custom styles for components.

---

## 📦 Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation Steps

1. **Clone the Repository**:
   ```bash
   git clone <frontend-repo-url>
   cd hubly-frontend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```
   Or, if using Yarn:
   ```bash
   yarn install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory and add the backend API URL:
   ```env
   REACT_APP_API_URL=http://localhost:4000/api
   ```

4. **Start the Development Server**:
   ```bash
   npm start
   ```
   Or:
   ```bash
   yarn start
   ```
   The app will be available at `http://localhost:3000`.

---

## 📂 Project Structure

```plaintext
src/
├── assets/                  # Images and static assets (e.g., hubly.png)
├── components/              # Reusable components (e.g., Navbar, Sidebar)
│   └── LandingPagesComponents/
├── pages/                   # Page components (e.g., Landing, Login, Chatbot)
├── redux/                   # Redux slices (authSlice, teamSlice, chatSlice)
└── styles/                  # CSS files for components and pages
```

---

## 🌐 Key Pages

- **Landing Page** (`/landing`): Marketing content and chatbot widget.
- **Login Page** (`/login`): User authentication with token storage.
- **Chatbot Config Page** (`/chatbot`): Admin settings for the chatbot.
- **Edit Profile Page** (`/edit-profile`): User profile management.

---

## 🔗 API Integration

The frontend communicates with the backend via these APIs:

| Endpoint                        | Description                      |
|---------------------------------|----------------------------------|
| `POST /api/auth/login`         | Authenticate user and get token  |
| `GET/POST/PATCH/DELETE /api/team` | Manage team members             |
| `GET/PATCH /api/chatbot`       | Manage chatbot configuration     |
| `POST /api/chats`              | Create a new chat                |
| `GET /api/chats/:chatId`       | Fetch a chat by ID               |
| `POST /api/chats/:chatId/messages` | Send a message to a chat     |

---

## 💡 Development Notes

- Ensure the backend server is running at `http://localhost:4000` (or the URL specified in `.env`).
- The chatbot polls the backend every 3 seconds, which may need optimization for production.
- The `sendMessageToChat` function in `ChatbotLanding.jsx` is a placeholder; replace it with the actual API when available.

---

## 🔮 Future Improvements

- Add loading spinners during API calls.
- Optimize chatbot polling for better performance (e.g., WebSocket).
- Implement responsive design for mobile devices.
- Enhance form validation on all pages.

---
