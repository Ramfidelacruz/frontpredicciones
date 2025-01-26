<template>
    <div>
      <h1 class="text-3xl font-bold mb-4">Predicciones de Partidos</h1>
      <h2 class="text-xl font-semibold mb-4 text-gray-700">Selecciona hasta 10 Equipos</h2>
      
      <table class="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th class="p-3 border-b">Seleccionar</th>
            <th class="p-3 border-b">Equipo</th>
            <th class="p-3 border-b">Puntos</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="team in teams" :key="team.name">
            <td class="p-3 border-b">
              <input 
                type="checkbox" 
                :value="team.name" 
                v-model="selectedTeams" 
                :disabled="selectedTeams.length >= 10 && !selectedTeams.includes(team.name)" 
              />
            </td>
            <td class="p-3 border-b">{{ team.name }}</td>
            <td class="p-3 border-b">{{ team.points }}</td>
          </tr>
        </tbody>
      </table>
  
      <button 
        @click="getProbabilities" 
        class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition mt-4"
      >
        Obtener Probabilidades
      </button>
  
      <div v-if="probabilities.length > 0" class="mt-4">
        <h3 class="font-semibold text-lg mb-2">Probabilidades de Enfrentamientos</h3>
        <table class="w-full">
          <thead>
            <tr>
              <th>Partido</th>
              <th>Probabilidad Victoria Local</th>
              <th>Probabilidad Victoria Visitante</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(match, index) in probabilities" :key="index">
              <td>{{ match.homeTeam }} vs {{ match.awayTeam }}</td>
              <td>{{ match.probabilidad_victoria_local }}%</td>
              <td>{{ match.probabilidad_victoria_visitante }}%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  
  const teams = ref([]) // Aquí deberías cargar los equipos desde tu API
  const selectedTeams = ref([]) // Este debe ser un array de nombres de equipos
  const probabilities = ref([])
  
  onMounted(async () => {
    try {
      const response = await axios.get('http://localhost:8000/teams/');
      teams.value = response.data; // Asegúrate de que esto sea un array de objetos
    } catch (error) {
      console.error('Error al cargar equipos:', error);
    }
  })
  
  const getProbabilities = async () => {
    if (selectedTeams.value.length > 0) {
      try {
        const response = await axios.get(`http://localhost:8000/probabilities`, {
          params: { teams: selectedTeams.value } // Asegúrate de que solo envíes los nombres
        });
        probabilities.value = response.data; // Asegúrate de que esto sea un array de objetos
      } catch (error) {
        console.error('Error al obtener probabilidades:', error);
      }
    }
  }
  </script>
  
  <style scoped>
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    padding: 12px;
    text-align: left;
  }
  
  th {
    background-color: #f2f2f2;
  }
  </style>