<template>
  <div>
    <h1>Validator Dashboard</h1>
    <select v-model="filterStatus">
      <option value="all">All</option>
      <option value="pending">Pending</option>
      <option value="approved">Approved</option>
      <option value="rejected">Rejected</option>
    </select>
    <div v-for="req in filteredRequests" :key="req.id">
      {{ req.user_name }} | {{ req.start_date }} - {{ req.end_date }} | {{ req.status }}
      <button v-if="req.status === 'pending'" @click="approve(req.id)">Approve</button>
      <button v-if="req.status === 'pending'" @click="openRejectModal(req.id)">Reject</button>
    </div>

    <div v-if="showRejectModal" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; padding: 2rem; border: 1px solid #ccc;">
      <h3>Reject Request</h3>
      <textarea v-model="rejectComments" placeholder="Comments"></textarea>
      <button @click="confirmReject">Confirm</button>
      <button @click="closeRejectModal">Cancel</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const API_URL = 'http://localhost:3000/api'

const allRequests = ref([])
const filterStatus = ref('all')
const showRejectModal = ref(false)
const rejectComments = ref('')
const requestToReject = ref<number | null>(null)

const filteredRequests = computed(() => {
  if (filterStatus.value === 'all') {
    return allRequests.value
  }
  return allRequests.value.filter(req => req.status === filterStatus.value)
})

async function fetchRequests() {
  try {
    const response = await axios.get(`${API_URL}/requests`)
    allRequests.value = response.data
  } catch (error) {
    console.error('Error fetching requests:', error)
  }
}

async function approve(id: number) {
  try {
    await axios.put(`${API_URL}/requests/${id}/approve`)
    alert('Request approved!')
    fetchRequests()
  } catch (error) {
    console.error('Error approving request:', error)
  }
}

function openRejectModal(id: number) {
  requestToReject.value = id
  showRejectModal.value = true
}

function closeRejectModal() {
  showRejectModal.value = false
  rejectComments.value = ''
  requestToReject.value = null
}

async function confirmReject() {
  if (requestToReject.value) {
    try {
      await axios.put(`${API_URL}/requests/${requestToReject.value}/reject`, {
        comments: rejectComments.value
      })
      alert('Request rejected!')
      fetchRequests()
    } catch (error) {
      console.error('Error rejecting request:', error)
    }
  }
  closeRejectModal()
}

onMounted(() => {
  fetchRequests()
})
</script>
