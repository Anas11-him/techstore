import { useState, useEffect } from 'react'
import './Admin.css'

const ADMIN_USER = 'admin'
const ADMIN_PASS = 'techstore123'
const STATUSES = ['Pending', 'Processing', 'Shipped', 'Delivered']
const STATUS_COLORS = {
  Pending: '#f59e0b',
  Processing: '#3b82f6',
  Shipped: '#8b5cf6',
  Delivered: '#22c55e'
}

function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = () => {
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      localStorage.setItem('adminAuth', 'true')
      onLogin()
    } else {
      setError('Invalid username or password')
    }
  }

  return (
    <div className="admin-login">
      <div className="login-card">
        <div className="login-logo">Tech<span>Store</span></div>
        <h2>Admin Login</h2>
        <p>Enter your credentials to access the dashboard</p>
        <div className="login-form">
          <div className="login-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="admin"
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
            />
          </div>
          <div className="login-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
            />
          </div>
          {error && <div className="login-error">⚠️ {error}</div>}
          <button className="login-btn" onClick={handleLogin}>
            Login to Dashboard →
          </button>
        </div>
      </div>
    </div>
  )
}

function Admin() {
  const [auth, setAuth] = useState(localStorage.getItem('adminAuth') === 'true')
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)
  const [filter, setFilter] = useState('All')

  const fetchOrders = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/orders')
      const data = await res.json()
      setOrders(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (auth) {
      fetchOrders()
      const interval = setInterval(fetchOrders, 10000)
      return () => clearInterval(interval)
    }
  }, [auth])

  const updateStatus = async (id, status) => {
    await fetch(`http://localhost:5000/api/orders/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    })
    fetchOrders()
    if (selected?.id === id) setSelected(prev => ({ ...prev, status }))
  }

  const filtered = filter === 'All' ? orders : orders.filter(o => o.status === filter)

  const stats = {
    total: orders.length,
    revenue: orders.reduce((s, o) => s + o.total, 0),
    pending: orders.filter(o => o.status === 'Pending').length,
    delivered: orders.filter(o => o.status === 'Delivered').length
  }

  if (!auth) return <AdminLogin onLogin={() => setAuth(true)} />

  return (
    <div className="admin">
      <div className="admin-header">
        <div>
          <h1>Admin <span>Dashboard</span></h1>
          <p>Manage and track all customer orders</p>
        </div>
        <div style={{ display: 'flex', gap: '0.8rem' }}>
          <button className="refresh-btn" onClick={fetchOrders}>↻ Refresh</button>
          <button className="refresh-btn" style={{ color: '#f87171', borderColor: 'rgba(248,113,113,0.2)' }}
            onClick={() => { localStorage.removeItem('adminAuth'); setAuth(false) }}>
            Logout
          </button>
        </div>
      </div>

      <div className="admin-stats">
        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <div><p>Total Orders</p><strong>{stats.total}</strong></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div><p>Total Revenue</p><strong>${stats.revenue.toFixed(2)}</strong></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <div><p>Pending</p><strong>{stats.pending}</strong></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div><p>Delivered</p><strong>{stats.delivered}</strong></div>
        </div>
      </div>

      <div className="admin-filters">
        {['All', ...STATUSES].map(s => (
          <button key={s} className={`filter-btn ${filter === s ? 'active' : ''}`} onClick={() => setFilter(s)}>
            {s}
            <span className="filter-count">
              {s === 'All' ? orders.length : orders.filter(o => o.status === s).length}
            </span>
          </button>
        ))}
      </div>

      <div className="admin-content">
        <div className="orders-list">
          {loading ? (
            <div className="admin-loading">Loading orders...</div>
          ) : filtered.length === 0 ? (
            <div className="admin-empty"><span>📭</span><p>No orders yet</p></div>
          ) : (
            filtered.map(order => (
              <div key={order.id} className={`order-row ${selected?.id === order.id ? 'active' : ''}`} onClick={() => setSelected(order)}>
                <div className="order-row-left">
                  <strong className="order-id">#{order.id}</strong>
                  <p className="order-customer">{order.customer?.name}</p>
                  <p className="order-date">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="order-row-right">
                  <strong className="order-total">${order.total?.toFixed(2)}</strong>
                  <span className="order-status" style={{ background: STATUS_COLORS[order.status] + '20', color: STATUS_COLORS[order.status] }}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {selected ? (
          <div className="order-detail">
            <div className="detail-header">
              <h2>Order #{selected.id}</h2>
              <button className="close-btn" onClick={() => setSelected(null)}>✕</button>
            </div>

            <div className="status-pipeline">
              {STATUSES.map((s, i) => {
                const currentIndex = STATUSES.indexOf(selected.status)
                const isDone = i <= currentIndex
                return (
                  <div key={s} className="pipeline-step">
                    <div className={`pipeline-dot ${isDone ? 'done' : ''}`} style={isDone ? { background: STATUS_COLORS[s] } : {}}>
                      {isDone ? '✓' : i + 1}
                    </div>
                    <span className={isDone ? 'done' : ''}>{s}</span>
                    {i < STATUSES.length - 1 && <div className={`pipeline-line ${i < currentIndex ? 'done' : ''}`}></div>}
                  </div>
                )
              })}
            </div>

            <div className="status-actions">
              <p>Update Status:</p>
              <div className="status-btns">
                {STATUSES.map(s => (
                  <button key={s} className={`status-btn ${selected.status === s ? 'current' : ''}`}
                    style={selected.status === s ? { background: STATUS_COLORS[s], color: 'white' } : {}}
                    onClick={() => updateStatus(selected.id, s)}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="detail-section">
              <h3>Customer</h3>
              <p><strong>Name:</strong> {selected.customer?.name}</p>
              <p><strong>Email:</strong> {selected.customer?.email}</p>
              <p><strong>Phone:</strong> {selected.customer?.phone}</p>
              <p><strong>Address:</strong> {selected.customer?.address}</p>
            </div>

            <div className="detail-section">
              <h3>Items Ordered</h3>
              {selected.items?.map(item => (
                <div key={item.id} className="detail-item">
                  <span>{item.image}</span>
                  <div><p>{item.name}</p><small>x{item.qty} · ${item.price} each</small></div>
                  <strong>${(item.price * item.qty).toFixed(2)}</strong>
                </div>
              ))}
            </div>

            <div className="detail-total">
              <span>Total Paid</span>
              <strong>${selected.total?.toFixed(2)}</strong>
            </div>

            <div className="detail-section">
              <h3>Payment</h3>
              <p className="payment-id">ID: {selected.paymentIntentId}</p>
            </div>
          </div>
        ) : (
          <div className="detail-empty">
            <span>👈</span>
            <p>Select an order to view details</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Admin