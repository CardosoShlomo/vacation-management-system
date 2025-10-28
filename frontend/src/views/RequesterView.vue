<template>
  <div>
    <h1>Request Vacation</h1>

    <form @submit.prevent="handleSubmit">
      <input type="date" v-model="startDate" required />
      <input type="date" v-model="endDate" required />
      <textarea v-model="reason" placeholder="Reason (optional)"></textarea>
      <button type="submit">Submit</button>
    </form>

    <div v-for="req in requests" :key="req.id">
      {{ req.startDate }} - {{ req.endDate }} | {{ req.status }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

const API_URL = 'http://localhost:3000/api'

const startDate = ref('')
const endDate = ref('')
const reason = ref('')
const requests = ref([])

async function fetchMyRequests() {
  try {
    const response = await axios.get(`${API_URL}/requests/my`)
    requests.value = response.data
  } catch (error) {
    console.error('Error fetching requests:', error)
  }
}

async function handleSubmit() {
  try {
    await axios.post(`${API_URL}/requests`, {
      start_date: startDate.value,
      end_date: endDate.value,
      reason: reason.value
    })
    alert('Request submitted!')
    startDate.value = ''
    endDate.value = ''
    reason.value = ''
    fetchMyRequests() // Refresh list
  } catch (error) {
    console.error('Error submitting request:', error)
    alert('Failed to submit request')
  }
}

onMounted(() => {
  fetchMyRequests()
})
</script>
