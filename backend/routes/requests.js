const express = require('express')
const router = express.Router()
const knex = require('../db')

// GET /api/requests/my - Get current user's requests
router.get('/my', async (req, res) => {
  try {
    const userId = 1 // Hardcoded for demo
    const requests = await knex('vacation_requests')
      .where({ user_id: userId })
      .orderBy('created_at', 'desc')
    res.json(requests)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// GET /api/requests - Get all requests (for validator)
router.get('/', async (req, res) => {
  try {
    const requests = await knex('vacation_requests')
      .join('users', 'vacation_requests.user_id', 'users.id')
      .select('vacation_requests.*', 'users.name as user_name')
      .orderBy('created_at', 'desc')
    res.json(requests)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// POST /api/requests - Submit new request
router.post('/', async (req, res) => {
  try {
    const { start_date, end_date, reason } = req.body
    const userId = 1 // Hardcoded for demo
    
    const [id] = await knex('vacation_requests').insert({
      user_id: userId,
      start_date,
      end_date,
      reason
    }).returning('id')
    
    res.status(201).json({ id, message: 'Request created' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// PUT /api/requests/:id/approve - Approve request
router.put('/:id/approve', async (req, res) => {
  try {
    await knex('vacation_requests')
      .where({ id: req.params.id })
      .update({ status: 'approved' })
    res.json({ message: 'Request approved' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// PUT /api/requests/:id/reject - Reject request
router.put('/:id/reject', async (req, res) => {
  try {
    const { comments } = req.body
    await knex('vacation_requests')
      .where({ id: req.params.id })
      .update({ status: 'rejected', comments })
    res.json({ message: 'Request rejected' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
