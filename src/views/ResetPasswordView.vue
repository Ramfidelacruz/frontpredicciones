<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const newPassword = ref('')
const error = ref('')

const handleReset = async () => {
  try {
    const response = await fetch('http://localhost:8000/reset-password/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email.value,
        new_password: newPassword.value
      })
    })

    if (response.ok) {
      router.push('/login')
    } else {
      throw new Error('Error al restablecer la contraseña')
    }
  } catch (e) {
    error.value = e.message
  }
}
</script>

<template>
  
  <div class="min-h-screen bg-gray-900 flex items-center justify-center p-4">
    <div class="max-w-md w-full">
      <!-- Logo y título -->
      <div class="flex flex-col items-center space-y-4 mb-8">
        <div class="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center">
          <span class="text-2xl font-bold text-emerald-500">V</span>
        </div>
        <h2 class="text-3xl font-bold text-gray-200">Restablecer Contraseña</h2>
        <p class="text-gray-400 text-sm">Ingresa tu correo y nueva contraseña</p>
      </div>

      <!-- Formulario -->
      <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-xl p-8">
        <form @submit.prevent="handleReset" class="space-y-6">
          <!-- Email -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-300">
              Correo Electrónico
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <input
                v-model="email"
                type="email"
                required
                class="block w-full pl-10 pr-3 py-2.5 border border-gray-600/50 rounded-lg 
                       bg-gray-700/50 text-gray-200 placeholder-gray-400
                       focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 
                       transition duration-200"
                placeholder="nombre@ejemplo.com"
              />
            </div>
          </div>

          <!-- Nueva Contraseña -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-300">
              Nueva Contraseña
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                v-model="newPassword"
                type="password"
                required
                class="block w-full pl-10 pr-3 py-2.5 border border-gray-600/50 rounded-lg 
                       bg-gray-700/50 text-gray-200 placeholder-gray-400
                       focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 
                       transition duration-200"
                placeholder="••••••••"
              />
            </div>
          </div>

          <!-- Error message -->
          <div v-if="error" 
               class="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-sm
                      flex items-center space-x-2 text-red-400">
            <svg class="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{{ error }}</span>
          </div>

          <!-- Reset button -->
          <button
            type="submit"
            class="w-full flex justify-center items-center py-2.5 px-4 
                   bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg 
                   font-medium shadow-lg hover:shadow-emerald-500/20 
                   focus:outline-none focus:ring-2 focus:ring-emerald-500 
                   transition duration-200"
          >
            <span>Cambiar Contraseña</span>
          </button>

          <!-- Back to login link -->
          <div class="text-center text-sm pt-2">
            <span class="text-gray-400">¿Recordaste tu contraseña?</span>
            <router-link 
              to="/login" 
              class="ml-1.5 font-medium text-emerald-400 hover:text-emerald-300 
                     transition duration-200"
            >
              Iniciar Sesión
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>

</template>