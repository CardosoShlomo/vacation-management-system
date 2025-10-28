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
import { ref } from 'vue'

const startDate = ref('')
const endDate = ref('')
const reason = ref('')
const requests = ref([
  { id: 1, startDate: '2025-11-01', endDate: '2025-11-05', status: 'pending' }
])

function handleSubmit() {
  console.log('Submit', { startDate: startDate.value, endDate: endDate.value, reason: reason.value })
}
</script>
