<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'; // Asegúrate de que esto esté importado

const router = useRouter()
const authStore = useAuthStore(); // Asegúrate de que authStore esté definido
const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const handleLogin = async () => {
  console.log("Intentando iniciar sesión...");
  try {
    loading.value = true;
    error.value = '';

    // Llama al método login de authStore
    const data = await authStore.login(email.value, password.value);

    // Redireccionar al dashboard o página principal
    await router.push('/dashboard/');

  } catch (e) {
    console.log("Error en el inicio de sesión:", e);
    error.value = e.message; // Maneja el error
  } finally {
    loading.value = false;
  }
};
</script>

<!-- El resto de tu template se mantiene EXACTAMENTE igual -->

<template>
  <div class="min-h-screen bg-gray-900 flex items-center justify-center p-4">
    <div class="max-w-md w-full">
      <!-- Logo y título -->
      <div class="flex flex-col items-center space-y-4 mb-8">
        <div class="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center">
          <span class="text-2xl font-bold text-emerald-500">V</span>
        </div>
        <h2 class="text-3xl font-bold text-gray-200">Iniciar Sesión</h2>
        <p class="text-gray-400 text-sm">Bienvenido de nuevo</p>
      </div>

      <!-- Formulario -->
      <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-xl p-8">
        <form @submit.prevent="handleLogin" class="space-y-6">
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

          <!-- Password -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-300">
              Contraseña
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                v-model="password"
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

          <!-- Login button -->
          <button
            type="submit"
            @click="login"
            class="w-full flex justify-center items-center py-2.5 px-4 
                   bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg 
                   font-medium shadow-lg hover:shadow-emerald-500/20 
                   focus:outline-none focus:ring-2 focus:ring-emerald-500 
                   transition duration-200"
          >
          <span v-if="loading">Cargando...</span>
            <span>Iniciar Sesión</span>
          </button>

          <!-- Register link -->
          <div class="text-center text-sm pt-2">
            <span class="text-gray-400">¿No tienes cuenta?</span>
            <router-link 
              to="/register" 
              class="ml-1.5 font-medium text-emerald-400 hover:text-emerald-300 
                     transition duration-200"
            >
              Registrarse
            </router-link>
            <router-link 
  to="/reset-password" 
  class="ml-1.5 font-medium text-emerald-400 hover:text-emerald-300"
>
  ¿Olvidaste tu contraseña?
</router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>