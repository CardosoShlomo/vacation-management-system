<template>
  <div class="container">
    <h1>Vacation Requests Dashboard</h1>

    <div class="filter-sticky">
      <label>Filter by Status:</label>
      <select v-model="filterStatus">
        <option value="all">All</option>
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
        <option value="rejected">Rejected</option>
      </select>
    </div>

    <div class="requests-list">
      <div v-for="req in filteredRequests" :key="req.id" class="request-card">
        <div class="request-header">
          <span class="user-info">{{ req.user_name }}</span>
          <span class="status-badge" :class="'status-' + req.status">{{ req.status }}</span>
        </div>

        <div class="request-details">
          <p><strong>Dates:</strong> {{ formatDate(req.start_date) }} to {{ formatDate(req.end_date) }}</p>
          <p v-if="req.reason"><strong>Reason:</strong> {{ req.reason }}</p>
          <p v-if="req.comments"><strong>Comments:</strong> {{ req.comments }}</p>
        </div>

        <div v-if="req.status === 'pending'" class="actions">
          <button @click="approve(req.id)" class="btn-approve">Approve</button>
          <button @click="openRejectModal(req.id)" class="btn-reject">Reject</button>
        </div>
      </div>
    </div>

    <div v-if="showRejectModal" class="modal" @click.self="closeRejectModal">
      <div class="modal-content">
        <h3>Reject Request</h3>
        <textarea
          v-model="rejectComments"
          placeholder="Add comments (optional)..."
          rows="4"
        ></textarea>
        <div class="modal-actions">
          <button @click="confirmReject" class="btn-reject">Confirm Reject</button>
          <button @click="closeRejectModal" class="btn-cancel">Cancel</button>
        </div>
      </div>
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

function formatDate(dateString: string) {
  return dateString.split('T')[0]
}

onMounted(() => {
  fetchRequests()
})
</script>

<style scoped>
.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 1rem;
}

h1 {
  margin-bottom: 1.5rem;
  color: #2c3e50;
}

.filter-sticky {
  position: sticky;
  top: 80px;
  z-index: 50;
  background: white;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.filter-sticky label {
  font-weight: 600;
  color: #333;
}

select {
  padding: 0.6rem 1.2rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  background: white;
  cursor: pointer;
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
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #eee;
}

.user-info {
  font-size: 1.15rem;
  font-weight: 600;
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

.request-details p {
  margin: 0.5rem 0;
  color: #555;
}

.actions {
  margin-top: 1rem;
  display: flex;
  gap: 0.75rem;
}

button {
  padding: 0.6rem 1.25rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 600;
  transition: all 0.2s;
}

.btn-approve {
  background: #28a745;
  color: white;
}

.btn-approve:hover {
  background: #218838;
  transform: translateY(-1px);
}

.btn-reject {
  background: #dc3545;
  color: white;
}

.btn-reject:hover {
  background: #c82333;
  transform: translateY(-1px);
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  min-width: 450px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
}

.modal-content h3 {
  margin-bottom: 1rem;
  color: #2c3e50;
}

.modal-content textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 1rem;
  font-size: 1rem;
  font-family: inherit;
}

.modal-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
}

.btn-cancel {
  background: #6c757d;
  color: white;
}

.btn-cancel:hover {
  background: #5a6268;
}
</style>
