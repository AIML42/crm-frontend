import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../utils/api'

export const fetchChats = createAsyncThunk('chat/fetchChats', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/chats')
    // console.log('API Response:', response.data); 
    return response.chats
  } catch (error) {
    return rejectWithValue(error.response.data.message)
  }
})

export const fetchChatMessages = createAsyncThunk('chat/fetchChatMessages', async (chatId, { rejectWithValue }) => {
  try {
    const response = await api.get(`/chats/${chatId}`)
    return response.chat
  } catch (error) {
    return rejectWithValue(error.response.data.message)
  }
})

export const sendMessage = createAsyncThunk('chat/sendMessage', async ({ chatId, message }, { rejectWithValue }) => {
  try {
    const response = await api.post(`/chats/${chatId}/message`, { message, sender: 'agent' })
    return response.chat
  } catch (error) {
    return rejectWithValue(error.response.data.message)
  }
})


export const updateTicket = createAsyncThunk('chat/updateTicket', async ({ ticketId, status, assignedTo }, { rejectWithValue }) => {
  try {
    const response = await api.patch(`/tickets/${ticketId}`, { status, assignedTo })
    return response.data
  } catch (error) {
    return rejectWithValue(error.response.data.message)
  }
})

export const fetchChatbotConfig = createAsyncThunk('chat/fetchChatbotConfig', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/chatbot/config')
    return response.config
  } catch (error) {
    return rejectWithValue(error.response.data.message)
  }
})

export const updateChatbotConfig = createAsyncThunk('chat/updateChatbotConfig', async (config, { rejectWithValue }) => {
  try {
    const response = await api.post('/chatbot/config', config)
    return response.config
  } catch (error) {
    return rejectWithValue(error.response.data.message)
  }
})

export const fetchAnalytics = createAsyncThunk('chat/fetchAnalytics', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/metrics') 
    return response.metrics 
  } catch (error) {
    return rejectWithValue(error.response.data.message)
  }
})

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    chats: [],
    activeChat: null,

    chatbotConfig: null,
    missedChatTimeout: null,
    loading: false,
    error: null,
  },
  reducers: {
    setActiveChat: (state, action) => {
      state.activeChat = action.payload
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChats.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchChats.fulfilled, (state, action) => {
        state.loading = false
        state.chats = action.payload
      })
      .addCase(fetchChats.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(fetchChatMessages.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchChatMessages.fulfilled, (state, action) => {
        state.loading = false
        state.activeChat = action.payload
      })
      .addCase(fetchChatMessages.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(sendMessage.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false
        state.activeChat = action.payload
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(updateTicket.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateTicket.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(updateTicket.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(fetchChatbotConfig.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchChatbotConfig.fulfilled, (state, action) => {
        state.loading = false
        state.chatbotConfig = action.payload
        state.missedChatTimeout = action.payload.missedChatTimeout
      })
      .addCase(fetchChatbotConfig.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(fetchAnalytics.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAnalytics.fulfilled, (state, action) => {
        state.loading = false
        state.analytics = action.payload
      })
      .addCase(fetchAnalytics.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { setActiveChat, clearError } = chatSlice.actions
export default chatSlice.reducer