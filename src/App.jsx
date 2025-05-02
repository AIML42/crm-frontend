import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import Landing from './pages/LandingPage/Landing'
import Signup from './pages/SignupPage/Signup'
import Login from './pages/LoginPage/Login'
import Chat from './pages/ChatPage/Chat'
import Dashboard from './pages/DashboardPage/Dashboard'
import { useEffect } from 'react'
import Chatbot from './pages/ChatbotPage/Chatbot'

function RouteHandler() {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token && window.location.pathname === '/') {
      navigate('/dashboard')
    }
  }, [navigate])

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path='/chatbot-config' element={<Chatbot/>}/>
    </Routes>
  )
}

function App() {
  return (
    <Router>
      <RouteHandler />
    </Router>
  )
}

export default App