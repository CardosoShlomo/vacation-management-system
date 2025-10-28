<template>
  <div class="container">
    <h1>Request Vacation</h1>

    <form @submit.prevent="handleSubmit">
      <div>
        <label>Start Date</label>
        <input type="date" v-model="startDate" required />
      </div>
      <div>
        <label>End Date</label>
        <input type="date" v-model="endDate" required />
      </div>
      <div>
        <label>Reason (optional)</label>
        <textarea v-model="reason" rows="3"></textarea>
      </div>
      <button type="submit">Submit Request</button>
    </form>

    <h2>My Requests</h2>
    <div class="requests-list">
      <div v-for="req in requests" :key="req.id" class="request-card">
        <div class="request-header">
          <span class="dates"><strong>{{ req.start_date }}</strong> to <strong>{{ req.end_date }}</strong></span>
          <span class="status-badge" :class="'status-' + req.status">{{ req.status }}</span>
        </div>
        <p v-if="req.reason"><strong>Reason:</strong> {{ req.reason }}</p>
        <p v-if="req.comments" style="color: #721c24; margin-top: 0.5rem;">
          <strong>Validator comments:</strong> {{ req.comments }}
        </p>
      </div>
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
    fetchMyRequests()
  } catch (error) {
    console.error('Error submitting request:', error)
    alert('Failed to submit request')
  }
}

onMounted(() => {
  fetchMyRequests()
})
</script>

<style scoped>
.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 1rem;
}

h1 {
  margin-bottom: 1.5rem;
  color: #2c3e50;
}

form {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  margin-bottom: 2rem;
}

form > div {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #333;
}

input, textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

button {
  background: #667eea;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  width: 100%;
}

button:hover {
  background: #5568d3;
}

h2 {
  margin-bottom: 1rem;
  color: #2c3e50;
}

.requests-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.request-card {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.08);
}

.request-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.dates {
  font-size: 1.05rem;
  color: #2c3e50;
}

.status-badge {
  padding: 0.35rem 0.9rem;
  border-radius: 16px;
  font-size: 0.875rem;
  font-weight: 600;
}

.status-pending {
  background: #fff3cd;
  color: #856404;
}

.status-approved {
  background: #d4edda;
  color: #155724;
}

.status-rejected {
  background: #f8d7da;
  color: #721c24;
}

.request-card p {
  margin: 0.5rem 0;
  color: #555;
}
</style>
