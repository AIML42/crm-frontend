import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Icon } from "@iconify/react"
import { toast } from 'react-toastify'
import Sidebar from '../../components/Sidebar/Sidebar'
import { fetchChatbotConfig, updateChatbotConfig } from '../../redux/chatSlice'
import './ChatbotStyle.css'
import hublyWithStatus from '../../assets/hubly_with_status.png'
import hubly from '../../assets/hubly.png'

const Chatbot = () => {
  const dispatch = useDispatch()
  const { chatbotConfig, loading, error } = useSelector((state) => state.chat)

  // Local state for form inputs
  const [headerColor, setHeaderColor] = useState('#334758')
  const [backgroundColor, setBackgroundColor] = useState('#EEEEEE')
  const [customizeMessage, setCustomizeMessage] = useState('How can I help you?')
  const [welcomeMessage, setWelcomeMessage] = useState("Want to chat about Hubly? I'm a chatbot here to help you find your way.")
  const [introductionForm, setIntroductionForm] = useState({
    name: true,
    phone: true,
    email: true,
  })
  const [missedChatTimeout, setMissedChatTimeout] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  // Fetch initial config
  useEffect(() => {
    dispatch(fetchChatbotConfig())
  }, [dispatch])

  // Update local state when config is fetched
  useEffect(() => {
    if (chatbotConfig) {
      setHeaderColor(chatbotConfig.headerColor || '#334758')
      setBackgroundColor(chatbotConfig.backgroundColor || '#EEEEEE')
      setCustomizeMessage(chatbotConfig.customizeMessage || 'How can I help you?')
      setWelcomeMessage(chatbotConfig.welcomeMessage || "Want to chat about Hubly? I'm a chatbot here to help you find your way.")
      setIntroductionForm(chatbotConfig.introductionForm || { name: true, phone: true, email: true })
      const totalSeconds = chatbotConfig.missedChatTimeout ? Math.floor(chatbotConfig.missedChatTimeout / 1000) : 3600
      setMissedChatTimeout({
        days: Math.floor(totalSeconds / (24 * 60 * 60)),
        hours: Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60)),
        minutes: Math.floor((totalSeconds % (60 * 60)) / 60),
        seconds: totalSeconds % 60,
      })
    }
  }, [chatbotConfig])

  // Handle form submission
  const handleSave = () => {
    const totalSeconds = (missedChatTimeout.days * 24 * 60 * 60) +
                        (missedChatTimeout.hours * 60 * 60) +
                        (missedChatTimeout.minutes * 60) +
                        missedChatTimeout.seconds
    const config = {
      welcomeMessage,
      botName: chatbotConfig?.botName || 'Hubly',
      headerColor,
      backgroundColor,
      customizeMessage,
      missedChatTimeout: totalSeconds * 1000, // Convert to milliseconds
      introductionForm,
      triggers: chatbotConfig?.triggers || [],
    }
    dispatch(updateChatbotConfig(config))
      .then(() => toast.success('Chatbot configuration updated'))
      .catch(() => toast.error('Failed to update chatbot configuration'))
  }

  // Toggle introduction form fields
  const toggleFormField = (field) => {
    setIntroductionForm((prev) => ({
      ...prev,
      [field]: !prev[field],
    }))
  }

  return (
    <div className="chatbot-page">
      <Sidebar />
      <div className="main-content">
      <h3>Chat Bot</h3>
        <div className="preview-section">
          <div className="chatbot-preview" style={{ backgroundColor }}>
            <div className="chatbot-header" style={{ backgroundColor: headerColor }}>
              <img src={hublyWithStatus} alt="" />
              <span>Hubly</span>
            </div>
            <div className="chatbot-messages">
              <div className="message-with-icon">
              <img style={{width:30, height:30}} src={hubly} alt="" />
              <div className="message bot">
              
                <p> {customizeMessage}</p>
              </div>
              </div>
              

              <div className="introduction-form">
              <h4>INTRODUCTION</h4>
              {introductionForm.name && (
                <input type="text" placeholder="Your name" disabled />
              )}
              {introductionForm.phone && (
                <input type="text" placeholder="+1 (000) 000-0000" disabled />
              )}
              {introductionForm.email && (
                <input type="email" placeholder="example@gmail.com" disabled />
              )}
              <button disabled>THANK YOU!</button>
            </div>
              
            </div>
            
            <div className="chatbot-input">
              <input type="text" placeholder="Write a message" disabled />
              <Icon icon="mdi:send" className="send-icon" />
            </div>
            
           
            
          </div>
          
          <div className="chat-welcome-message">
          <img style={{width:40, height:40}} src={hubly} alt="" />
          <Icon icon='system-uicons:cross'></Icon>
          <p>{welcomeMessage}</p>
          </div>
        </div>
        <div className="config-section">
          <div className="config-item">
            <h4>Header Color</h4>
            <div className="color-options">
              <button
                className={`color-option ${headerColor === '#FFFFFF' ? 'selected' : ''}`}
                style={{ backgroundColor: '#FFFFFF' }}
                onClick={() => setHeaderColor('#FFFFFF')}
              />
              <button
                className={`color-option ${headerColor === '#000000' ? 'selected' : ''}`}
                style={{ backgroundColor: '#000000' }}
                onClick={() => setHeaderColor('#000000')}
              />
              <button
                className={`color-option ${headerColor === '#334758' ? 'selected' : ''}`}
                style={{ backgroundColor: '#334758' }}
                onClick={() => setHeaderColor('#334758')}
              />
              <span>{headerColor}</span>
            </div>
          </div>
          <div className="config-item">
            <h4>Custom Background Color</h4>
            <div className="color-options">
              <button
                className={`color-option ${backgroundColor === '#F0F0F0' ? 'selected' : ''}`}
                style={{ backgroundColor: '#F0F0F0' }}
                onClick={() => setBackgroundColor('#F0F0F0')}
              />
              <button
                className={`color-option ${backgroundColor === '#000000' ? 'selected' : ''}`}
                style={{ backgroundColor: '#000000' }}
                onClick={() => setBackgroundColor('#000000')}
              />
              <button
                className={`color-option ${backgroundColor === '#EEEEEE' ? 'selected' : ''}`}
                style={{ backgroundColor: '#EEEEEE' }}
                onClick={() => setBackgroundColor('#EEEEEE')}
              />
              <span>{backgroundColor}</span>
            </div>
          </div>
          <div className="config-item">
            <h4>Customize Message</h4>
            <textarea
              value={customizeMessage}
              onChange={(e) => setCustomizeMessage(e.target.value)}
            />
            <p>Ask me anything!</p>
          </div>
          <div className="config-item">
            <h4>Introduction Form</h4>
            <div className="form-toggle">
              <label>Your name</label>
              <button
                className={`toggle ${introductionForm.name ? 'active' : ''}`}
                onClick={() => toggleFormField('name')}
              >
                {introductionForm.name ? 'ON' : 'OFF'}
              </button>
            </div>
            <div className="form-toggle">
              <label>Your phone</label>
              <button
                className={`toggle ${introductionForm.phone ? 'active' : ''}`}
                onClick={() => toggleFormField('phone')}
              >
                {introductionForm.phone ? 'ON' : 'OFF'}
              </button>
            </div>
            <div className="form-toggle">
              <label>Your email</label>
              <button
                className={`toggle ${introductionForm.email ? 'active' : ''}`}
                onClick={() => toggleFormField('email')}
              >
                {introductionForm.email ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>
          <div className="config-item">
            <h4>Welcome Message</h4>
            <textarea
              value={welcomeMessage}
              onChange={(e) => setWelcomeMessage(e.target.value)}
              maxLength={60}
            />
            <p>{welcomeMessage.length}/60</p>
          </div>
          <div className="config-item">
            <div className="timer-container">
            <h4>Missed chat timer</h4>
            <div className="timer-inputs">
              <div className="timer-field">
                <input
                  type="number"
                  value={missedChatTimeout.days}
                  onChange={(e) => setMissedChatTimeout({ ...missedChatTimeout, days: parseInt(e.target.value) || 0 })}
                  min="0"
                />
                <label>Days</label>
              </div>
              <div className="timer-field">
                <input
                  type="number"
                  value={missedChatTimeout.hours}
                  onChange={(e) => setMissedChatTimeout({ ...missedChatTimeout, hours: parseInt(e.target.value) || 0 })}
                  min="0"
                  max="23"
                />
                <label>Hours</label>
              </div>
              <div className="timer-field">
                <input
                  type="number"
                  value={missedChatTimeout.minutes}
                  onChange={(e) => setMissedChatTimeout({ ...missedChatTimeout, minutes: parseInt(e.target.value) || 0 })}
                  min="0"
                  max="59"
                />
                <label>Minutes</label>
              </div>
              <div className="timer-field">
                <input
                  type="number"
                  value={missedChatTimeout.seconds}
                  onChange={(e) => setMissedChatTimeout({ ...missedChatTimeout, seconds: parseInt(e.target.value) || 0 })}
                  min="0"
                  max="59"
                />
                <label>Seconds</label>
              </div>
              
            </div>
            <button className="save-button" onClick={handleSave}>SAVE</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chatbot