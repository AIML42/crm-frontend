const BASE_URL = 'http://localhost:3000/api'

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
      // if(endpoint === '/chatbot/config'){
      //   console.log('in api.js')
      //   console.log(result);
      // }
      if (!response.ok) throw new Error(result.message || 'Request failed')
      return result
    } catch (error) {
      throw new Error(error.message || 'Network error')
    }
  },
}

export default api