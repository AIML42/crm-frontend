import { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Landing from '../../pages/LandingPage/Landing'
import Signup from '../../pages/SignupPage/Signup'
import Login from '../../pages/LoginPage/Login'
import Chat from '../../pages/ChatPage/Chat'
import Dashboard from '../../pages/DashboardPage/Dashboard'
import Chatbot from '../../pages/ChatbotPage/Chatbot'
import Analytics from '../../pages/AnalyticsPage/Analytics'
import Team from '../../pages/TeamPage/Team'
import EditProfile from '../../pages/EditProfilePage/EditProfile';

function RouteHandler() {
  const navigate = useNavigate();
  const { token, user, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    // Don't redirect while we're still loading the user data
    if (loading) return;

    if (!token && window.location.pathname !== '/login' && window.location.pathname !== '/signup' && window.location.pathname !== '/') {
      navigate('/');
    }

    if (token && user && window.location.pathname === '/') {
      navigate('/dashboard');
    }
  }, [navigate, token, user, loading]);

  // Optional: Show a loading indicator while fetching user data
  if (token && loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path='/chatbot-config' element={<Chatbot/>}/>
      <Route path='/analytics' element={<Analytics/>}/>
      <Route path='/team' element={<Team/>}/>
      <Route path='edit-profile' element={<EditProfile/>}></Route>
    </Routes>
  );
}

export default RouteHandler;