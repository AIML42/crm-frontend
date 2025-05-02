import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../utils/api'

export const fetchTickets = createAsyncThunk('ticket/fetchTickets', async ({ filter, email }, { rejectWithValue }) => {
  try {
    let endpoint = '/tickets'
    if (filter && filter !== 'all') {
      endpoint += `?status=${filter}`
    } else if (email) {
      endpoint += `?email=${email}`
    }
    const response = await api.get(endpoint)
    return { tickets: response.tickets }
  } catch (err) {
    return rejectWithValue(err.message)
  }
})

const ticketSlice = createSlice({
  name: 'ticket',
  initialState: {
    tickets: [],
    loading: false,
    error: null,
    filter: 'all',
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTickets.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.loading = false
        state.tickets = action.payload.tickets
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { setFilter } = ticketSlice.actions
export default ticketSlice.reducer