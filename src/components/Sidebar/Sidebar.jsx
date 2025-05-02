import { Link, useLocation } from 'react-router-dom'
import { Icon } from "@iconify/react"
import './SidebarStyle.css'
import profile from '../../assets/profile.png'

const Sidebar = () => {
  const location = useLocation()

  return (
    <div className="sidebar">
      <div className="sidebar-nav">
        <Icon className='logo' icon='bi:cloud-haze2' fontSize={50}></Icon>
        
        {/* Dashboard */}
        <Link to="/dashboard">
          <div className="inner-icon">
            <Icon icon="ph:house-light" fontSize={20} />
            {location.pathname === '/dashboard' ? <p>Dashboard</p> : <></>}
          </div>
        </Link>

        {/* Contact Center */}
        <Link to="/chat">
          <div className="inner-icon">
            <Icon icon="ic:outline-message" fontSize={20} />
            {location.pathname === '/chat' ? <p>Contact Center</p> : <></>}
          </div>
        </Link>

        {/* Analytics */}
        <Link to="/analytics">
          <div className="inner-icon">
            <Icon icon="uis:analytics" fontSize={20} />
            {location.pathname === '/analytics' ? <p>Analytics</p> : <></>}
          </div>
        </Link>

        {/* Chat Bot */}
        <Link to="/chatbot-config">
          <div className="inner-icon">
            <Icon icon="fluent:bot-16-regular" fontSize={20} />
            {location.pathname === '/chatbot-config' ? <p>Chat Bot</p> : <></>}
          </div>
        </Link>

        {/* Team */}
        <Link to="/team">
          <div className="inner-icon">
            <Icon icon="ri:team-fill" fontSize={20} />
            {location.pathname === '/team' ? <p>Team</p> : <></>}
          </div>
        </Link>

        {/* Settings */}
        <Link to="/edit-profile">
          <div className="inner-icon">
            <Icon icon="bi:gear" fontSize={20} />
            {location.pathname === '/edit-profile' ? <p>Settings</p> : <></>}
          </div>
        </Link>
      </div>

      <img src={profile} alt="" />
    </div>
  )
}

export default Sidebar