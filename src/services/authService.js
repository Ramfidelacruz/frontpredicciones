import axios from 'axios'

/* const API_URL = 'https://test-production-eb4d.up.railway.app' */
const API_URL = 'https://backendidk-production.up.railway.app'

export default {
  async login(email, password) {
    try {
      const response = await axios.post(`${API_URL}/token/`, { email, password })
      const { access_token } = response.data
      
      localStorage.setItem('token', access_token)
      return response.data
    } catch (error) {
      console.error('Login failed', error)
      throw error
    }
  },

  async register(email, password) {
    try {
      const response = await axios.post(`${API_URL}/users/`, { email, password })
      return response.data
    } catch (error) {
      console.error('Registration failed', error)
      throw error
    }
  },

  logout() {
    localStorage.removeItem('token/')
  },

  getCurrentUser() {
    return localStorage.getItem('token')
  },

  setupAxiosInterceptors() {
    axios.interceptors.request.use(
      config => {
        const token = this.getCurrentUser()
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
      },
      error => Promise.reject(error)
    )
  }
}