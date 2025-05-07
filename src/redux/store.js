import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import chatReducer from './chatSlice'
import ticketReducer from './ticketSlice'
import teamReducer from './teamSlice' 

export default configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    ticket:ticketReducer,
    team: teamReducer
  },
})