<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import axios from 'axios'

const authStore = useAuthStore()
const teams = ref([])
const userPredictions = ref([])
const upcomingMatches = ref([])

onMounted(async () => {
  try {
    // Cargar rankings de equipos
    const teamsResponse = await axios.get('http://localhost:8000/teams/')
    teams.value = teamsResponse.data.slice(0, 10)  // Top 10 equipos

    // Cargar partidos próximos
    const matchesResponse = await axios.get('http://localhost:8000/matches/upcoming')
    upcomingMatches.value = matchesResponse.data.slice(0, 5)  // Próximos 5 partidos

    // TODO: Cargar predicciones del usuario
  } catch (error) {
    console.error('Error cargando datos:', error)
  }
})

const createPrediction = async (match) => {
  // Lógica para crear predicción
}
</script>

<template>
  <div class="dashboard container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Dashboard de Predicciones</h1>
    
    <!-- Sección de Rankings -->
    <div class="rankings mb-6">
      <h2 class="text-xl font-semibold mb-2">Top Equipos</h2>
      <table class="w-full border-collapse">
        <thead>
          <tr class="bg-gray-200">
            <th class="p-2 border">Posición</th>
            <th class="p-2 border">Equipo</th>
            <th class="p-2 border">Puntos</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(team, index) in teams" :key="team.id">
            <td class="p-2 border">{{ index + 1 }}</td>
            <td class="p-2 border">{{ team.name }}</td>
            <td class="p-2 border">{{ team.points || 0 }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Sección de Partidos Próximos -->
    <div class="upcoming-matches mb-6">
      <h2 class="text-xl font-semibold mb-2">Próximos Partidos</h2>
      <table class="w-full border-collapse">
        <thead>
          <tr class="bg-gray-200">
            <th class="p-2 border">Fecha</th>
            <th class="p-2 border">Local</th>
            <th class="p-2 border">Visitante</th>
            <th class="p-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="match in upcomingMatches" :key="match.id">
            <td class="p-2 border">{{ match.date }}</td>
            <td class="p-2 border">{{ match.home_team }}</td>
            <td class="p-2 border">{{ match.away_team }}</td>
            <td class="p-2 border">
              <button 
                @click="createPrediction(match)"
                class="bg-blue-500 text-white px-2 py-1 rounded"
              >
                Predecir
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Botón de Logout -->
    <button 
      @click="authStore.logout()"
      class="bg-red-500 text-white px-4 py-2 rounded"
    >
      Cerrar Sesión
    </button>
  </div>
</template>