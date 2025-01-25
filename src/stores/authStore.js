import { defineStore } from 'pinia'
import authService from '@/services/authService'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: null
  }),
  getters: {
    isAuthenticated() {
      return !!this.token
    }
  },
  actions: {
    async login(email, password) {
      try {
        const data = await authService.login(email, password)
        this.token = data.access_token
        return data
      } catch (error) {
        this.logout()
        throw error
      }
    },
    logout() {
      localStorage.removeItem('token')
      this.token = null
      this.user = null
    }
  }
})