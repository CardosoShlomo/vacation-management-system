<template>
  <div>
    <h1>Validator Dashboard</h1>

    <select v-model="filter">
      <option value="all">All</option>
      <option value="pending">Pending</option>
      <option value="approved">Approved</option>
      <option value="rejected">Rejected</option>
    </select>

    <div v-for="req in requests" :key="req.id">
      {{ req.userName }} | {{ req.startDate }} - {{ req.endDate }} | {{ req.status }}
      <button v-if="req.status === 'pending'" @click="approve(req.id)">Approve</button>
      <button v-if="req.status === 'pending'" @click="reject(req.id)">Reject</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const filter = ref('all')
const requests = ref([
  { id: 1, userName: 'John', startDate: '2025-11-01', endDate: '2025-11-05', status: 'pending' }
])

function approve(id: number) {
  console.log('Approve', id)
}

function reject(id: number) {
  console.log('Reject', id)
}
</script>
