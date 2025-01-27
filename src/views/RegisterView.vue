<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import authService from '@/services/authService'

const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

const handleRegister = async () => {
  try {
    await authService.register(email.value, password.value)
    router.push('/login/')
  } catch (err) {
    error.value = 'Registro fallido'
    console.error(err)
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center">Registrarse</h2>
      <form @submit.prevent="handleRegister" class="space-y-4">
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
          Registrarse
        </button>
      </form>
      <p class="mt-4 text-center">
        ¿Ya tienes cuenta? 
        <router-link to="/login" class="text-blue-500 hover:underline">
          Iniciar sesión
        </router-link>
      </p>
    </div>
  </div>
</template>