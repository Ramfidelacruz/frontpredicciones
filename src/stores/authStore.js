import { defineStore } from 'pinia';
import authService from '@/services/authService';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: null
  }),
  getters: {
    isAuthenticated() {
      return !!this.token;
    }
  },
  actions: {
    setToken(token) {
      this.token = token; // Asigna el token al estado
      localStorage.setItem('token', token); // Guarda el token en localStorage
    },
    async login(email, password) {
      try {
        const data = await authService.login(email, password);
        this.setToken(data.access_token); // Usa la nueva función setToken
        return data;
      } catch (error) {
        this.logout();
        throw error;
      }
    },
    logout() {
      localStorage.removeItem('token');
      this.token = null;
      this.user = null;
    }
  }
});