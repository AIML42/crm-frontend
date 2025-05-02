import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import chatReducer from './chatSlice'
import ticketReducer from './ticketSlice'

export default configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    ticket:ticketReducer,
  },
})