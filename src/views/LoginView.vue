
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const error = ref('')

const handleLogin = async () => {
  try {
    await authStore.login(email.value, password.value)
    router.push('/dashboard')
  } catch (err) {
    error.value = 'Login fallido. Verifica tus credenciales.'
    console.error(err)
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label for="email" class="block mb-2">Correo Electrónico</label>
          <input 
            v-model="email" 
            type="email" 
            required 
            class="w-full px-3 py-2 border rounded-md"
            placeholder="Ingresa tu correo"
          />
        </div>
        <div>
          <label for="password" class="block mb-2">Contraseña</label>
          <input 
            v-model="password" 
            type="password" 
            required 
            class="w-full px-3 py-2 border rounded-md"
            placeholder="Ingresa tu contraseña"
          />
        </div>
        <div v-if="error" class="text-red-500 text-sm">
          {{ error }}
        </div>
        <button 
          type="submit" 
          class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          Iniciar Sesión
        </button>
      </form>
      <p class="mt-4 text-center">
        ¿No tienes cuenta? 
        <router-link to="/register" class="text-blue-500 hover:underline">
          Registrarse
        </router-link>
      </p>
    </div>
  </div>
</template>