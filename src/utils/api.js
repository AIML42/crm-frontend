const BASE_URL = 'https://crm-backend-h4d5.onrender.com/api'

const api = {
  post: async (endpoint, data) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(data),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.message || 'Request failed')
      return result
    } catch (error) {
      throw new Error(error.message || 'Network error')
    }
  },

  get: async (endpoint) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.message || 'Request failed')
      return result
    } catch (error) {
      throw new Error(error.message || 'Network error')
    }
  },

  patch: async (endpoint, data) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(data),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.message || 'Request failed')
      return result
    } catch (error) {
      throw new Error(error.message || 'Network error')
    }
  },

  delete: async (endpoint, data = null) => {
    try {
      const token = localStorage.getItem('token')
      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      }
      
      // Sometimes DELETE requests need a body
      if (data) {
        options.body = JSON.stringify(data)
      }
      
      const response = await fetch(`${BASE_URL}${endpoint}`, options)
      
      // Some DELETE endpoints might return empty content
      if (response.status === 204) {
        return { success: true }
      }
      
      const result = await response.json()
      if (!response.ok) throw new Error(result.message || 'Request failed')
      return result
    } catch (error) {
      throw new Error(error.message || 'Network error')
    }
  },
}

export default api