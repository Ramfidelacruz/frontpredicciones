<template>
    <div class="prediction-modal fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 class="text-2xl font-bold mb-4">Predecir Resultado</h2>
        
        <div class="flex justify-between items-center mb-4">
          <div class="text-center">
            <h3 class="font-semibold">{{ match.home_team }}</h3>
            <input 
              v-model.number="homeScore" 
              type="number" 
              min="0" 
              class="w-20 text-center border rounded p-2"
            />
          </div>
          
          <span class="text-xl">vs</span>
          
          <div class="text-center">
            <h3 class="font-semibold">{{ match.away_team }}</h3>
            <input 
              v-model.number="awayScore" 
              type="number" 
              min="0" 
              class="w-20 text-center border rounded p-2"
            />
          </div>
        </div>
  
        <div class="flex justify-between">
          <button 
            @click="submitPrediction"
            class="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Guardar Predicción
          </button>
          <button 
            @click="$emit('close')"
            class="bg-gray-300 text-gray-700 px-4 py-2 rounded"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import axios from 'axios'
  
  const props = defineProps({
    match: {
      type: Object,
      required: true
    }
  })
  
  const emit = defineEmits(['close', 'prediction-saved'])
  
  const homeScore = ref(0)
  const awayScore = ref(0)
  
  const submitPrediction = async () => {
    try {
      const prediction = {
        match_id: props.match.id,
        home_team: props.match.home_team,
        away_team: props.match.away_team,
        home_score: homeScore.value,
        away_score: awayScore.value
      }
  
      const response = await axios.post('http://localhost:8000/predictions/', prediction)
      
      emit('prediction-saved', response.data)
      emit('close')
    } catch (error) {
      console.error('Error al guardar predicción:', error)
    }
  }
  </script>