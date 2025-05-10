Hubly Frontend
Overview
The Hubly frontend is a React-based web application designed to provide a CRM platform for managing leads, teams, and chats. It features a landing page with a chatbot, a dashboard with sidebar navigation, and various pages for managing teams, users, and chatbot configurations.
Features

Landing Page: Includes a chatbot widget that allows visitors to interact with the Hubly bot, configurable via the admin dashboard.
Dashboard:
Sidebar navigation with pages for Teams, Chatbot Configuration, and Edit Profile.
Team management: Add, edit, and delete team members.
Chatbot configuration: Customize welcome messages, colors, introduction forms, and more.
Edit Profile: Update user details (first name, email, password) with automatic logout on email/password change.


Chatbot:
Collapsible widget on the landing page.
Displays a welcome message, allows users to send messages, and collects user info via an introduction form.
Polls the backend for chat updates every 3 seconds.


Authentication:
Login page with token-based authentication.
Protected routes for authenticated users.



Tech Stack

React: Frontend framework for building the UI.
Redux Toolkit: State management for user authentication, team data, and chat data.
React Router: Handles client-side routing.
Axios: For making API requests to the backend.
React Toastify: For displaying success/error notifications.
Iconify: For icons used throughout the app.
CSS: Custom styles for each component.

Setup Instructions
Prerequisites

Node.js (v16 or higher)
npm or yarn

Installation

Clone the repository:git clone <frontend-repo-url>
cd hubly-frontend


Install dependencies:npm install

oryarn install


Create a .env file in the root directory and add the backend API URL:REACT_APP_API_URL=http://localhost:4000/api


Start the development server:npm start

oryarn start

The app will run at http://localhost:3000.

Project Structure

src/
assets/: Images and other static assets (e.g., hubly.png, landing_page1.png).
components/: Reusable components (e.g., Navbar, Sidebar, ChatbotLanding).
pages/: Page components (e.g., Landing, Login, Chatbot, EditProfile).
redux/: Redux slices for state management (authSlice, teamSlice, chatSlice).
styles/: CSS files for each component/page.



Key Pages

Landing Page (/landing): Features a marketing section and the chatbot widget.
Login Page (/login): Authenticates users and stores the token in local storage.
Chatbot Config Page (/chatbot): Allows admins to configure the chatbot (welcome message, colors, etc.).
Edit Profile Page (/edit-profile): Allows users to update their profile details.

API Integration
The frontend communicates with the backend via the following APIs:

Auth: POST /api/auth/login
Team: GET/POST/PATCH/DELETE /api/team
Chat: GET/POST /api/chats, GET /api/chats/:chatId, POST /api/chats/:chatId/messages
Chatbot Config: GET/PATCH /api/chatbot

Development Notes

Ensure the backend server is running at http://localhost:4000 (or the URL specified in .env).
The chatbot polls the backend every 3 seconds for updates, which may need optimization for production.
The sendMessageToChat function in ChatbotLanding.jsx is a placeholder; replace it with the actual API when available.

Future Improvements

Add loading spinners during API calls.
Optimize chatbot polling for better performance.
Implement responsive design for mobile devices.
Add more robust form validation.

