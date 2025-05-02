import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Icon } from "@iconify/react"
import Sidebar from '../../components/Sidebar/Sidebar'
import { fetchTickets, setFilter } from '../../redux/ticketSlice'
import './DashboardStyle.css'

const Dashboard = () => {
  const dispatch = useDispatch()
  const { tickets, loading, error, filter } = useSelector((state) => state.ticket)
  const [searchEmail, setSearchEmail] = useState('')

  useEffect(() => {
    dispatch(fetchTickets({ filter, email: searchEmail }))
  }, [dispatch, filter, searchEmail])

  const handleFilterChange = (newFilter) => {
    dispatch(setFilter(newFilter))
  }

  const formatDateTime = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const calculateHoursElapsed = (createdAt) => {
    const createdDate = new Date(createdAt)
    const currentDate = new Date()
    const diffInSeconds = (currentDate - createdDate) / 1000 // Difference in seconds
    return Math.floor(diffInSeconds / 3600) // Convert to hours
  }

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : ''
  }

  return (
    <div className="dashboard-page">
      <Sidebar />
      <div className="main-content">
        <div className="top-bar">
          <div className="top-bar-title">
            <h2>Dashboard</h2>
          </div>
        </div>
        <div className="content-header">
          <div className="search-wrapper">
            <Icon icon="mynaui:search" fontSize={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search by email"
              value={searchEmail}
              onChange={(e) => setSearchEmail(e.target.value)}
              className="search-bar"
            />
          </div>
          <div className="filter-tabs-wrapper">
            <div className="filter-tabs">
              <button
                className={filter === 'all' ? 'active' : ''}
                onClick={() => handleFilterChange('all')}
              >
                <Icon icon="lets-icons:message-light" fontSize={16} /> All Tickets
              </button>
              <button
                className={filter === 'resolved' ? 'active' : ''}
                onClick={() => handleFilterChange('resolved')}
              >
                Resolved
              </button>
              <button
                className={filter === 'unresolved' ? 'active' : ''}
                onClick={() => handleFilterChange('unresolved')}
              >
                Unresolved
              </button>
            </div>
            <div className="filter-tabs-border"></div>
          </div>
        </div>
        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}
        <div className="ticket-list">
          {tickets.map((ticket) => (
            <div key={ticket._id} className="ticket-item">
              <div className="ticket-content">
                <div className="ticket-header-meta">
                  <span className="ticket-number">Ticket#{ticket.ticketNumber}</span>
                  <span className="posted-at">Posted at {formatDateTime(ticket.createdAt)}</span>
                </div>
                <div className="ticket-message-elapsed">
                  <p className="ticket-message" style={{paddingTop:20}}>{ticket.message}</p>
                  <div className="hours-elapsed">{calculateHoursElapsed(ticket.createdAt)}</div>
                </div>
                <div className="ticket-divider"></div>
                <div className="ticket-contact-meta">
                  <div className="ticket-contact">
                    <div className="contact-avatar">
                      {getInitial(ticket.userInfo.name)}
                    </div>
                    <div>
                      <p>{ticket.userInfo.name}</p>
                      <p>{ticket.userInfo.phone}</p>
                      <p>{ticket.userInfo.email}</p>
                    </div>
                  </div>
                  <Link to={`/chat?ticketId=${ticket._id}`} className="open-ticket">
                    Open Ticket
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard