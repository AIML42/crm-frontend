import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, Link } from 'react-router-dom'
import { Icon } from "@iconify/react"
import { toast } from 'react-toastify'
import Sidebar from '../../components/Sidebar/Sidebar'
import { fetchChats, fetchChatMessages, sendMessage, fetchTeamMembers, updateTicket, setActiveChat, fetchChatbotConfig} from '../../redux/chatSlice'
import './ChatStyle.css'

const Chat = () => {
  const dispatch = useDispatch()
  const { chats, activeChat, teamMembers, chatbotConfig, missedChatTimeout, loading, error} = useSelector((state) => state.chat)
  const location = useLocation()
  const [message, setMessage] = useState('')
  const [selectedTeamMember, setSelectedTeamMember] = useState('')
  const [ticketStatus, setTicketStatus] = useState('Select status')
  const [teammateDropdownOpen, setTeammateDropdownOpen] = useState(false);
const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);

const [originalTeamMember, setOriginalTeamMember] = useState('') // Add this
const [originalStatus, setOriginalStatus] = useState('Open') // Add this
const [showModal, setShowModal] = useState(false) // Add this
const [modalMessage, setModalMessage] = useState('') // Add this
const [modalAction, setModalAction] = useState(null) // Add this
const [isMissedChat, setIsMissedChat] = useState(false) // Add this

  // Get ticketId from URL query parameter
  const query = new URLSearchParams(location.search)
  const ticketId = query.get('ticketId')

  // Fetch chats and team members on mount
  useEffect(() => {
    dispatch(fetchChats())
    dispatch(fetchTeamMembers())
    dispatch(fetchChatbotConfig()) 
  }, [dispatch])

  // Fetch messages for the selected chat based on ticketId
  useEffect(() => {
    if (ticketId && chats.length > 0) {
      const chat = chats.find((c) => c._id === ticketId)
      if (chat) {
        dispatch(fetchChatMessages(chat._id))
      }
    }
  }, [ticketId, chats, dispatch])

  useEffect(() => {
    function handleClickOutside(event) {
      if (teammateDropdownOpen || statusDropdownOpen) {
        if (!event.target.closest('.custom-select') && !event.target.closest('.simple-select')) {
          setTeammateDropdownOpen(false);
          setStatusDropdownOpen(false);
        }
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [teammateDropdownOpen, statusDropdownOpen]);

  useEffect(() => {
    if (activeChat) {
      setSelectedTeamMember(activeChat.assignedTo || 'Select team member')
      setOriginalTeamMember(activeChat.assignedTo || '')
      setTicketStatus(activeChat.status ? activeChat.status.charAt(0).toUpperCase() + activeChat.status.slice(1) : 'Select status')
      setOriginalStatus(activeChat.status ? activeChat.status.charAt(0).toUpperCase() + activeChat.status.slice(1) : 'Open')
    }
  }, [activeChat])

  const checkMissedChat = () => {
    // console.log('inside checMissedChat')
    // console.log(chatbotConfig)
    // console.log(missedChatTimeout)
    // console.log(activeChat, activeChat.messages, missedChatTimeout)
    if (activeChat && activeChat.messages.length > 0 && missedChatTimeout) {
      
      const lastMessage = activeChat.messages[activeChat.messages.length - 1]
      // console.log('lastMessage', lastMessage)
      const lastMessageTime = new Date(lastMessage.timestamp).getTime()
      // console.log('lastMessageTime', lastMessageTime)
      const currentTime = new Date().getTime()
      // console.log('currentTime', currentTime)
      const timeElapsed = currentTime - lastMessageTime
      // console.log(timeElapsed)
      setIsMissedChat(timeElapsed > missedChatTimeout)
    }
  }

  // Handle sending a message
  const handleSendMessage = () => {
    if (message.trim() && activeChat) {
      console.log('Sending message:', message)
      checkMissedChat()
      dispatch(sendMessage({ chatId: activeChat._id, message }))
        .then(() => {
          setMessage('')
        })
    }
  }

  const handleTeamMemberChange = (value) => {
    const newTeamMember = value
    if (newTeamMember !== originalTeamMember) {
      setModalMessage('Chat would be assigned to Different team member')
      setModalAction(() => () => {
        // setSelectedTeamMember(newTeamMember)
        setOriginalTeamMember(newTeamMember)
        dispatch(updateTicket({ ticketId: activeChat._id, status: ticketStatus.toLowerCase(), assignedTo: newTeamMember }))
          .then(() => toast.success('Team member updated'))
          .catch(() => toast.error('Failed to update team member'))
      })
      setShowModal(true)
    }
    setSelectedTeamMember(newTeamMember)
  }
  
  const handleStatusChange = (value) => {
    console.log('Status changed:', value)
    
    const newStatus = value
    console.log(newStatus, originalStatus)
    if (newStatus !== originalStatus) {
      const message = newStatus === 'Resolved' ? 'Chat will be closed' : 'Chat will be opened'
      setModalMessage(message)
      setModalAction(() => () => {
        setTicketStatus(newStatus)
        setOriginalStatus(newStatus)
        dispatch(updateTicket({ ticketId: activeChat._id, status: newStatus.toLowerCase(), assignedTo: selectedTeamMember }))
          .then(() => toast.success('Ticket status updated'))
          .catch(() => toast.error('Failed to update ticket status'))
      })
      setShowModal(true)
    }
    setTicketStatus(newStatus)
  }

  // Handle updating ticket status and assigned team member
  const handleUpdateTicket = () => {
    if (activeChat) {
      console.log('Updating ticket:', activeChat._id)
      console.log('Selected team member:', selectedTeamMember)
      console.log('Ticket status:', ticketStatus)

      // dispatch(updateTicket({ ticketId: activeChat._id, status: ticketStatus.toLowerCase(), assignedTo: selectedTeamMember }))
      //   .then(() => {
      //     toast.success('Ticket updated successfully')
      //   })
      //   .catch(() => {
      //     toast.error('Failed to update ticket')
      //   })
    }
  }

  // Format timestamp
  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  }

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : ''
  }

  // console.log(isMissedChat)

  return (
    <div className="chat-page">
      <Sidebar />
      <div className="main-content">
        <div className="chat-list-section">
          <h3>Contact Center</h3>
          <h4>Chats</h4>
          <div className="chats-border"></div>
          {loading && <p>Loading...</p>}
          {error && <p className="error">{error}</p>}
          {chats.map((chat) => (
            <div
              key={chat._id}
              className={`chat-row ${activeChat?._id === chat._id ? 'active' : ''}`}
              onClick={() => dispatch(setActiveChat(chat))}
            >
              {/* Border indicator (hidden by default) */}
              <div className="chat-border"></div>

              {/* Chat item */}
              <div className="chat-item">
                <div className="chat-avatar">{getInitial(chat.userInfo.name)}</div>
                <div className="chat-details">
                  <p className="chat-title">{chat.userInfo.name}</p>
                  <p className="chat-preview">{chat.messages[0]?.content || 'No messages'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="message-section">
          {activeChat ? (
            <>
              <div className="chat-header">
                <h2>Ticket# {activeChat._id}</h2>
                <Icon icon="ph:house-light" fontSize={15} />
              </div>
              <div className="message-section-main">
              <div className="chat-date">
                <span className="date-text">{formatDate(activeChat.firstMessageAt)}</span>
              </div>
              {isMissedChat && <p className="missed-chat-warning">Replying to missed chat</p>} {/* Add this */}
              <div className="chat-messages">
                {activeChat.messages.map((msg) => (
                  <div key={msg._id} className={`message ${msg.sender}`}>
                    <div className="message-avatar">{getInitial(msg.sender === 'user' ? activeChat.userInfo.name : msg.sender)}</div>
                    <p>{msg.content}</p>
                  </div>
                ))}
              </div>
              <div className="chat-input">
                <input
                  type="text"
                  placeholder="type here"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button onClick={handleSendMessage}><Icon icon="garden:play-26" /></button>
              </div>
              </div>
              {ticketStatus === 'Resolved' && <p className="chat-closed-message">This chat has been closed</p>} {/* Add this */}
            </>
          ) : (
            <div className="no-chat-selected">
              <p>Select a chat to start messaging</p>
            </div>
          )}
        </div>
        <div className="details-section">
          {activeChat ? (
            <>
              <div className="details-section-chatid">
                 <div className="message-avatar">{getInitial(activeChat.userInfo.name)}</div>
                 <div className="chat-indicator">Chat</div>
              </div>
              
              <div className="details-content">
                <h4>Details</h4>
                
                <div className="details-content-icon">
                <Icon style={{fontSize:20,}} icon='mdi:contact-outline'></Icon> 
                <p>{activeChat.userInfo.name}</p>
                </div>
                <div className="details-content-icon">
                <Icon style={{fontSize:20,}} icon='mdi-light:phone'></Icon> 
                <p>{activeChat.userInfo.phone}</p>
                </div>
                <div className="details-content-icon">
                <Icon style={{fontSize:20,}} icon='lets-icons:message-light'></Icon> 
                <p>{activeChat.userInfo.email}</p>
                </div>
                
              </div>
              
              <div className="teammates-section">

  <h4>Teammates</h4>
  <div className="custom-select">
    <div className="select-selected" onClick={() => setTeammateDropdownOpen(!teammateDropdownOpen)}>
  
      {selectedTeamMember !== 'Select team member' &&(<div className="select-avatar">{getInitial(teamMembers.find(m => m._id === selectedTeamMember)?.firstName || '')}</div>)}
      {selectedTeamMember !== 'Select team member' &&(<span>{teamMembers.find(m => m._id === selectedTeamMember)?.firstName} {teamMembers.find(m => m._id === selectedTeamMember)?.lastName}</span>)}
      {selectedTeamMember === 'Select team member' && <span>{selectedTeamMember}</span>}
      {/* <span>{selectedTeamMember}</span> */}
      <Icon icon="mdi:chevron-down" className="dropdown-icon" />
    </div>
    {teammateDropdownOpen && (
      <div className="select-items">
        {teamMembers.map((member) => (
          <div 
            key={member._id} 
            className="select-item" 
            onClick={() => {
              setSelectedTeamMember(member._id);
              setTeammateDropdownOpen(false);
              handleTeamMemberChange(member._id);
            }}
          >
            <div className="select-avatar">{getInitial(member.firstName)}</div>
            <span>{member.firstName} {member.lastName}</span>
          </div>
        ))}
      </div>
    )}
  </div>
</div>

<div className="status-section">
  <h4>Ticket status</h4>
  <div className="simple-select">
    <div className="select-selected" onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}>
      <span>{ticketStatus}</span>
      <Icon icon="mdi:chevron-down" className="dropdown-icon" />
    </div>
    {statusDropdownOpen && (
      <div className="select-items">
        <div className="select-item" onClick={() => {setTicketStatus("Resolved"); setStatusDropdownOpen(false); handleStatusChange('Resolved')}}>Resolved</div>
        <div className="select-item" onClick={() => {setTicketStatus("Unresolved"); setStatusDropdownOpen(false); handleStatusChange('Unresolved')}}>Unresolved</div>
      </div>
    )}
  </div>
</div>

              {/* <button className="update-ticket-button" onClick={handleUpdateTicket}>
                Update Ticket
              </button> */}

              {showModal && ( /* Add this */
        <div className="modal-overlay">
          <div className="modal-content">
            <p>{modalMessage}</p>
            <div className="modal-buttons">
              <button onClick={() => setShowModal(false)}>Cancel</button>
              <button onClick={() => {
                modalAction()
                setShowModal(false)
              }}>Confirm</button>
            </div>
          </div>
        </div>
      )}
            </>
          ) : (
            <p>Select a chat to view details</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Chat