import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../utils/api'

export const fetchTeamMembers = createAsyncThunk('team/fetchTeamMembers', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/team')
    return response.members
  } catch (error) {
    return rejectWithValue(error.response.data.message)
  }
})

export const addTeamMember = createAsyncThunk('team/addTeamMember', async (memberData, { rejectWithValue }) => {
  try {
    const response = await api.post('/team/add', memberData)
    return response.member
  } catch (error) {
    return rejectWithValue(error.response.data.message)
  }
})

export const updateTeamMember = createAsyncThunk('team/updateTeamMember', async ({ id, memberData }, { rejectWithValue }) => {
  try {
    const response = await api.patch(`/team/${id}`, memberData)
    return response.member
  } catch (error) {
    return rejectWithValue(error.response.data.message)
  }
})

export const deleteTeamMember = createAsyncThunk('team/deleteTeamMember', async (id, { rejectWithValue }) => {
  try {
    console.log('Deleting team member with ID:', id)
    const response = await api.delete(`/team/${id}`)
    console.log('Delete response:', response)
    return id
  } catch (error) {
    return rejectWithValue(error.response.data.message)
  }
})

const teamSlice = createSlice({
  name: 'team',
  initialState: {
    teamMembers: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeamMembers.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTeamMembers.fulfilled, (state, action) => {
        state.loading = false
        state.teamMembers = action.payload
      })
      .addCase(fetchTeamMembers.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(addTeamMember.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(addTeamMember.fulfilled, (state, action) => {
        state.loading = false
        state.teamMembers = [...state.teamMembers, action.payload]
      })
      .addCase(addTeamMember.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(updateTeamMember.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateTeamMember.fulfilled, (state, action) => {
        state.loading = false
        state.teamMembers = state.teamMembers.map(member =>
          member._id === action.payload.id ? { ...member, ...action.payload } : member
        )
      })
      .addCase(updateTeamMember.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(deleteTeamMember.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteTeamMember.fulfilled, (state, action) => {
        state.loading = false
        state.teamMembers = state.teamMembers.filter(member => member._id !== action.payload)
      })
      .addCase(deleteTeamMember.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default teamSlice.reducer