<script setup>
import { ref, onMounted, computed } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'
import axios from 'axios'
import PredictionModal from '@/components/PredictionModal.vue'


const API_URL = 'https://backendidk-production.up.railway.app'

const authStore = useAuthStore()
const router = useRouter()
const teams = ref([])
const upcomingMatches = ref([])
const selectedMatch = ref(null)
const showPredictionModal = ref(false)
const selectedHomeTeam = ref(null)
const selectedAwayTeam = ref(null)
const prediction = ref(null)


const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
})

onMounted(async () => {
  try {
    const teamsResponse = await api.get('/teams/')
    console.log('Teams:', teamsResponse.data)
    teams.value = teamsResponse.data

    const matchesResponse = await api.get('/matches/upcoming')
    console.log('Matches:', matchesResponse.data)
    upcomingMatches.value = matchesResponse.data
  } catch (error) {
    console.error('Error:', error)
    if (error.response?.status === 401) {
      // Si hay error de autenticación, redirigir al login
      authStore.logout()
      router.push('/login')
    }
  }
})

const createPrediction = (match) => {
  selectedMatch.value = match
  showPredictionModal.value = true
}

const handlePredictionSaved = (prediction) => {
  console.log('Predicción guardada:', prediction)
  // Aquí puedes actualizar la lista de predicciones si es necesario
}

const sortedTeams = computed(() => {
  return teams.value.slice().sort((a, b) => b.points - a.points); // Ordenar de mayor a menor
});

const getPrediction = async () => {
  if (selectedHomeTeam.value && selectedAwayTeam.value) {
    try {
      const response = await axios.get(`${API_URL}/predict/${selectedHomeTeam.value}/${selectedAwayTeam.value}`);
      prediction.value = response.data; // Asegúrate de que esto esté correcto
      console.log('Predicción:', prediction.value); // Agrega un log para verificar la respuesta
    } catch (error) {
      console.error('Error en predicción:', error);
    }
  }
}

// Función para manejar el cierre de sesión
const handleLogout = () => {
  authStore.logout(); // Llama al método logout de authStore
  router.push('/login'); // Redirige a la página de inicio de sesión
}

</script>

<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <div class="max-w-7xl mx-auto">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-gray-800">Dashboard de Predicciones</h1>
        <button 
          @click="handleLogout"
          class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
        >
          Cerrar Sesión
        </button>
      </div>

      <!-- Predicción Personalizada -->
      <div class="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 class="text-xl font-semibold mb-4 text-gray-700">Predicción Personalizada</h2>
        <div class="flex space-x-4">
          <select 
            v-model="selectedHomeTeam" 
            class="flex-1 p-2 border rounded"
          >
            <option value="">Selecciona Equipo Local</option>
            <option 
              v-for="team in teams" 
              :key="team.id"
              :value="team.name.name"
            >{{ team.name.name }}</option>
          </select>
          
          <select 
            v-model="selectedAwayTeam" 
            class="flex-1 p-2 border rounded"
          >
            <option value="">Selecciona Equipo Visitante</option>
            <option 
              v-for="team in teams" 
              :key="team.id"
              :value="team.name.name"
            >{{ team.name.name }}</option>
          </select>
          
          <button 
            @click="getPrediction"
            class="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold transition-colors duration-200"
            :disabled="!selectedHomeTeam || !selectedAwayTeam"
          >
            Predecir
          </button>
        </div>

        <div v-if="prediction" class="mt-4 p-4 bg-gray-50 rounded-lg border">
          <h3 class="font-semibold text-lg mb-2">Resultado de la Predicción</h3>
          <p class="text-gray-700">
            Probabilidad de victoria local: <span class="font-bold">{{ prediction.probabilidad_victoria_local }}%</span>
          </p>
          <p class="text-gray-700">
            Probabilidad de victoria visitante: <span class="font-bold">{{ prediction.probabilidad_victoria_visitante }}%</span>
          </p>
          <p class="text-gray-700">
            Resultado predicho: <span class="font-bold">{{ prediction.resultado_predicho }}</span>
          </p>
        </div>
      </div>
2
      <div class="grid md:grid-cols-2 gap-8">
        <!-- Top 10 Equipos con Scroll -->
        <div class="bg-white shadow-lg rounded-lg p-6">
          <h2 class="text-xl font-semibold mb-4 text-gray-700">Top 10 Equipos</h2>
          <div class="overflow-y-auto" style="max-height: 300px;"> <!-- Establece una altura máxima y permite el scroll -->
            <table class="w-full">
              <thead>
                <tr class="bg-gray-50">
                  <th class="p-3 text-left font-semibold text-gray-600">Pos</th>
                  <th class="p-3 text-left font-semibold text-gray-600">Equipo</th>
                  <th class="p-3 text-right font-semibold text-gray-600">Puntos</th>
                </tr>
              </thead>
              <tbody>
                <tr 
                  v-for="(team, index) in teams.slice(0, 10)" 
                  :key="index" 
                  class="border-b hover:bg-gray-50 transition"
                >
                  <td class="p-3">{{ index + 1 }}</td>
                  <td class="p-3">{{ team.name.name }}</td>
                  <td class="p-3 text-right">{{ team.name.points }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Próximos Partidos con Scroll -->
        <div class="bg-white shadow-lg rounded-lg p-6">
          <h2 class="text-xl font-semibold mb-4 text-gray-700">Próximos Partidos</h2>
          <div class="overflow-y-auto" style="max-height: 300px;"> <!-- Establece una altura máxima y permite el scroll -->
            <table class="w-full">
              <thead>
                <tr class="bg-gray-50">
                  <th class="p-3 text-left font-semibold text-gray-600">Fecha</th>
                  <th class="p-3 text-left font-semibold text-gray-600">Local</th>
                  <th class="p-3 text-left font-semibold text-gray-600">Visitante</th>
                </tr>
              </thead>
              <tbody>
                <tr 
                  v-for="(match, index) in upcomingMatches" 
                  :key="index" 
                  class="border-b hover:bg-gray-50 transition"
                >
                  <td class="p-3">{{ new Date(match.date).toLocaleDateString() }}</td>
                  <td class="p-3">{{ match.homeTeam?.name || '-' }}</td>
                  <td class="p-3">{{ match.awayTeam?.name || '-' }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>