const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())

const productsRouter = require('./routes/products')
const paymentsRouter = require('./routes/payments')
const ordersRouter = require('./routes/orders')

app.use('/api/products', productsRouter)
app.use('/api/payments', paymentsRouter)
app.use('/api/orders', ordersRouter)

app.get('/api/health', (req, res) => res.json({ status: 'TechStore API running' }))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`🚀 TechStore API running on port ${PORT}`))