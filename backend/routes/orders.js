const express = require('express')
const router = express.Router()

// In-memory orders store
let orders = []
let orderIdCounter = 1000

// Create order (called after successful payment)
router.post('/', (req, res) => {
  const { customer, items, total, paymentIntentId } = req.body

  const order = {
    id: `TS${orderIdCounter++}`,
    customer,
    items,
    total,
    paymentIntentId,
    status: 'Pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }

  orders.push(order)
  res.json({ success: true, order })
})

// Get all orders (admin)
router.get('/', (req, res) => {
  res.json(orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)))
})

// Update order status (admin)
router.patch('/:id/status', (req, res) => {
  const { status } = req.body
  const order = orders.find(o => o.id === req.params.id)
  if (!order) return res.status(404).json({ error: 'Order not found' })
  order.status = status
  order.updatedAt = new Date().toISOString()
  res.json({ success: true, order })
})

// Get single order
router.get('/:id', (req, res) => {
  const order = orders.find(o => o.id === req.params.id)
  if (!order) return res.status(404).json({ error: 'Order not found' })
  res.json(order)
})

module.exports = router