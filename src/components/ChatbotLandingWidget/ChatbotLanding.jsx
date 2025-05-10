import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Icon } from "@iconify/react"
import { toast } from 'react-toastify'
import hublyWithStatus from '../../assets/hubly_with_status.png'
import hubly from '../../assets/hubly.png'
import { fetchChatbotConfig, fetchChatMessages, sendChats } from '../../redux/chatSlice'
import './ChatbotLandingStyle.css'

const ChatbotLanding = () => {
  const dispatch = useDispatch()
  const { chatbotConfig, loading: configLoading, error: configError } = useSelector((state) => state.chat)

  // State for UI
  const [isExpanded, setIsExpanded] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [chatId, setChatId] = useState(null)
  const [messages, setMessages] = useState([])

  // State for form and messages
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
  })
  const [userMessage, setUserMessage] = useState('')

  // Default configuration
  const defaultWelcomeMessage = "👋 Want to chat about Hubly? I'm a chatbot here to help you find your way."
  const defaultCustomizeMessage = "Hello! How can I assist you today?"
  const defaultIntroductionForm = { name: true, phone: true, email: true }

  // Config values
  const welcomeMessage = chatbotConfig?.welcomeMessage || defaultWelcomeMessage
  const customizeMessage = chatbotConfig?.customizeMessage || defaultCustomizeMessage
  const introductionForm = chatbotConfig?.introductionForm || defaultIntroductionForm
  const headerColor = chatbotConfig?.headerColor || '#334758'
  const backgroundColor = chatbotConfig?.backgroundColor || '#EEEEEE'

  // Fetch chatbot config on mount
  useEffect(() => {
    dispatch(fetchChatbotConfig())
  }, [dispatch])

  // Initialize messages with the customize message only once
  useEffect(() => {
    if (customizeMessage && messages.length === 0) {
      setMessages([{ sender: 'bot', text: customizeMessage }])
    }
  }, [customizeMessage])

  // Polling for chat updates after chatId is set
  useEffect(() => {
    let intervalId
    if (chatId) {
      // Fetch chat immediately
      const fetchChat = () => {
        dispatch(fetchChatMessages(chatId))
          .then((response) => {
            
            const chat = response.payload
            // console.log(chat)
            if (chat && chat.messages) {
              // Replace all messages with the API response
              setMessages(
                chat.messages.map((msg) => ({
                  sender: msg.sender === 'user' ? 'user' : 'bot',
                  text: msg.content,
                }))
              )
            }
          })
          .catch(() => toast.error('Failed to fetch chat updates'))
      }

      fetchChat() // Initial fetch
      // Start polling every 3 seconds
      intervalId = setInterval(fetchChat, 3000)
    }
    return () => clearInterval(intervalId)
  }, [chatId, dispatch])

  // Handle expanding the chatbot
  const handleExpand = () => {
    setIsExpanded(true)
  }

  // Handle collapsing the chatbot
  const handleClose = () => {
    setIsExpanded(false)
  }

  // Handle user message input
  const handleSendMessage = () => {
    if (!userMessage.trim()) return

    // Add user message to the chat temporarily until the API updates
    setMessages((prev) => [...prev, { sender: 'user', text: userMessage }])

    if (!showForm && !chatId) {
      // Show the introduction form after the first message
      setShowForm(true)
    } else if (chatId) {
      // Send subsequent messages to the existing chat
      sendMessageToChat(userMessage)
    }

    setUserMessage('')
  }

  // Handle form submission
  const handleFormSubmit = () => {
    const payload = {
      userInfo: {
        name: formData.name || 'Customer',
        phone: formData.phone || '',
        email: formData.email || '',
      },
      message: messages.find((msg) => msg.sender === 'user')?.text || 'I need help',
    }

    dispatch(sendChats(payload))
      .then((response) => {
        const newChatId = response.payload.id
        setChatId(newChatId)
        setShowForm(false)
        toast.success('Chat created successfully')
      })
      .catch(() => toast.error('Failed to create chat'))
  }

  // Placeholder for sending subsequent messages (assuming API exists)
  const sendMessageToChat = (message) => {
    // Assuming an API like POST /api/chats/:chatId/messages
    const payload = {message: message, sender: 'user'}
    fetch(`http://localhost:4000/api/chats/${chatId}/message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then(() => {
        // No need to update messages here; the polling will handle it
      })
      .catch(() => toast.error('Failed to send message'))
  }

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="chatbot-landing">
      {!isExpanded ? (
        <div className="chatbot-collapsed" onClick={handleExpand}>
          <img style={{ width: 40, height: 40 }} src={hubly} alt="Hubly Icon" />
          <p>{welcomeMessage}</p>
          <Icon icon="system-uicons:cross" className="close-icon" />
        </div>
      ) : (
        <div className="chatbot-preview" style={{ backgroundColor }}>
          <div className="chatbot-header" style={{ backgroundColor: headerColor }}>
            <img src={hublyWithStatus} alt="Hubly Status" />
            <span>Hubly</span>
            {/* <Icon icon="system-uicons:cross" className="close-icon" onClick={handleClose} /> */}
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message-with-icon ${msg.sender === 'user' ? 'user-message' : ''}`}
              >
                {msg.sender === 'bot' && (
                  <img style={{ width: 30, height: 30 }} src={hubly} alt="Hubly Icon" />
                )}
                <div className={`message ${msg.sender}`}>
                  <p>{msg.text}</p>
                </div>
              </div>
            ))}

            {showForm && (
              <div className="introduction-form">
                <h4>INTRODUCTION</h4>
                {introductionForm.name && (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your name"
                  />
                )}
                {introductionForm.phone && (
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (000) 000-0000"
                  />
                )}
                {introductionForm.email && (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="example@gmail.com"
                  />
                )}
                <button style={{marginLeft:20, width:'80%', textAlign:'center'}} onClick={handleFormSubmit}>THANK YOU!</button>
              </div>
            )}
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              placeholder="Write a message"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Icon icon="mdi:send" className="send-icon" onClick={handleSendMessage} />
          </div>

          
        </div>
      )}
      <div className="chat-status" >
        {!isExpanded ? <Icon style={{fontSize: 40, color:'white'}}
        onClick={handleExpand} icon='mdi:message-group'></Icon> : <Icon style={{fontSize: 40, color:'white'}} 
        icon='oui:cross' onClick={handleClose}></Icon>}
        
</div>
    </div>
  )
}

export default ChatbotLanding