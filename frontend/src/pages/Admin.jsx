import { useState, useEffect, useRef } from 'react'
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
const STATUS_ICONS = {
  Pending: '⏳',
  Processing: '⚙️',
  Shipped: '🚚',
  Delivered: '✅'
}

/* ─────────────── LOGIN ─────────────── */
function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)

  const handleLogin = async () => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 600))
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      localStorage.setItem('adminAuth', 'true')
      onLogin()
    } else {
      setError('Invalid username or password')
    }
    setLoading(false)
  }

  return (
    <div className="al-page">
      <div className="al-bg-grid" />
      <div className="al-card">
        <div className="al-brand">
          <div className="al-brand-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#ffc94b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="al-brand-name">Tech<span>Store</span></span>
        </div>
        <h1>Welcome back</h1>
        <p className="al-sub">Sign in to your admin dashboard</p>

        <div className="al-form">
          <div className="al-field">
            <label>Username</label>
            <div className="al-input-wrap">
              <span className="al-input-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </span>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="admin"
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
              />
            </div>
          </div>

          <div className="al-field">
            <label>Password</label>
            <div className="al-input-wrap">
              <span className="al-input-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </span>
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
              />
              <button className="al-toggle-pass" onClick={() => setShowPass(s => !s)} type="button">
                {showPass ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          {error && (
            <div className="al-error">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              {error}
            </div>
          )}

          <button className={`al-btn ${loading ? 'loading' : ''}`} onClick={handleLogin} disabled={loading}>
            {loading ? <span className="al-spinner" /> : 'Sign In →'}
          </button>
        </div>

        <div className="al-hint">
          <code>admin</code> / <code>techstore123</code>
        </div>
      </div>
    </div>
  )
}

/* ─────────────── SIDEBAR ─────────────── */
const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg> },
  { id: 'orders', label: 'Orders', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg> },
  { id: 'products', label: 'Products', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg> },
  { id: 'analytics', label: 'Analytics', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg> },
  { id: 'settings', label: 'Settings', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93l-1.41 1.41M4.93 19.07l1.41-1.41M4.93 4.93l1.41 1.41M19.07 19.07l-1.41-1.41M12 2v2M12 20v2M2 12h2M20 12h2"/></svg> },
]

function Sidebar({ active, setActive, onLogout, orderCount }) {
  return (
    <aside className="sidebar">
      <div className="sb-brand">
        <div className="sb-brand-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#ffc94b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <span>Tech<b>Store</b></span>
      </div>

      <nav className="sb-nav">
        {NAV_ITEMS.map(item => (
          <button
            key={item.id}
            className={`sb-item ${active === item.id ? 'active' : ''}`}
            onClick={() => setActive(item.id)}
          >
            <span className="sb-item-icon">{item.icon}</span>
            <span className="sb-item-label">{item.label}</span>
            {item.id === 'orders' && orderCount > 0 && (
              <span className="sb-badge">{orderCount}</span>
            )}
          </button>
        ))}
      </nav>

      <div className="sb-footer">
        <div className="sb-user">
          <div className="sb-avatar">A</div>
          <div className="sb-user-info">
            <span className="sb-user-name">Admin</span>
            <span className="sb-user-role">Super Admin</span>
          </div>
        </div>
        <button className="sb-logout" onClick={onLogout} title="Logout">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
        </button>
      </div>
    </aside>
  )
}

/* ─────────────── STAT CARD ─────────────── */
function StatCard({ icon, label, value, sub, color, trend }) {
  return (
    <div className="stat-card" style={{ '--accent': color }}>
      <div className="sc-top">
        <div className="sc-icon" style={{ background: color + '18', color }}>{icon}</div>
        {trend != null && (
          <span className={`sc-trend ${trend >= 0 ? 'up' : 'down'}`}>
            {trend >= 0 ? '▲' : '▼'} {Math.abs(trend)}%
          </span>
        )}
      </div>
      <div className="sc-value">{value}</div>
      <div className="sc-label">{label}</div>
      {sub && <div className="sc-sub">{sub}</div>}
    </div>
  )
}

/* ─────────────── MINI CHART (SVG sparkline) ─────────────── */
function Sparkline({ data, color }) {
  const max = Math.max(...data, 1)
  const min = Math.min(...data)
  const range = max - min || 1
  const w = 120, h = 40, pad = 4
  const pts = data.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * (w - pad * 2)
    const y = h - pad - ((v - min) / range) * (h - pad * 2)
    return `${x},${y}`
  }).join(' ')

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ overflow: 'visible' }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points={`${pts} ${w - pad},${h} ${pad},${h}`} fill={color + '18'} stroke="none" />
    </svg>
  )
}

/* ─────────────── DASHBOARD PAGE ─────────────── */
function DashboardPage({ orders, products }) {
  const stats = {
    total: orders.length,
    revenue: orders.reduce((s, o) => s + (o.total || 0), 0),
    pending: orders.filter(o => o.status === 'Pending').length,
    delivered: orders.filter(o => o.status === 'Delivered').length,
    processing: orders.filter(o => o.status === 'Processing').length,
    shipped: orders.filter(o => o.status === 'Shipped').length,
  }

  const recent = [...orders].slice(0, 5)

  // Fake sparkline data
  const revData = [120, 180, 150, 240, 200, 300, 270, 350, 320, 400]
  const ordData = [3, 5, 4, 8, 6, 9, 7, 11, 9, 13]

  const topProducts = products.slice(0, 5).map(p => ({
    ...p,
    sales: Math.floor(Math.random() * 80 + 20)
  }))

  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <h2>Dashboard</h2>
          <p className="page-sub">Welcome back, Admin! Here's what's happening today.</p>
        </div>
        <div className="page-actions">
          <div className="live-dot" /><span className="live-text">Live</span>
        </div>
      </div>

      <div className="stats-grid">
        <StatCard icon="📦" label="Total Orders" value={stats.total} sub={`${stats.pending} pending`} color="#3b82f6" trend={12} />
        <StatCard icon="💰" label="Total Revenue" value={`$${stats.revenue.toFixed(2)}`} sub="All time" color="#ffc94b" trend={8} />
        <StatCard icon="🚚" label="Shipped" value={stats.shipped} sub={`${stats.delivered} delivered`} color="#8b5cf6" trend={5} />
        <StatCard icon="✅" label="Delivered" value={stats.delivered} sub="Completed" color="#22c55e" trend={15} />
      </div>

      <div className="dash-row">
        <div className="dash-card wide">
          <div className="dc-header">
            <h3>Recent Orders</h3>
            <span className="dc-badge">{stats.total} total</span>
          </div>
          {recent.length === 0 ? (
            <div className="empty-state"><span>📭</span><p>No orders yet</p></div>
          ) : (
            <table className="mini-table">
              <thead>
                <tr><th>Order</th><th>Customer</th><th>Total</th><th>Status</th><th>Date</th></tr>
              </thead>
              <tbody>
                {recent.map(o => (
                  <tr key={o.id}>
                    <td><span className="tbl-id">#{o.id}</span></td>
                    <td>{o.customer?.name || '—'}</td>
                    <td><strong className="tbl-amt">${o.total?.toFixed(2)}</strong></td>
                    <td>
                      <span className="tbl-status" style={{ background: STATUS_COLORS[o.status] + '20', color: STATUS_COLORS[o.status] }}>
                        {STATUS_ICONS[o.status]} {o.status}
                      </span>
                    </td>
                    <td className="tbl-date">{new Date(o.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="dash-col">
          <div className="dash-card">
            <div className="dc-header"><h3>Revenue Trend</h3></div>
            <div className="chart-wrap">
              <Sparkline data={revData} color="#ffc94b" />
            </div>
            <div className="chart-stat">
              <span>This week</span>
              <strong style={{ color: '#ffc94b' }}>+$1,240</strong>
            </div>
          </div>

          <div className="dash-card">
            <div className="dc-header"><h3>Order Volume</h3></div>
            <div className="chart-wrap">
              <Sparkline data={ordData} color="#3b82f6" />
            </div>
            <div className="chart-stat">
              <span>This week</span>
              <strong style={{ color: '#3b82f6' }}>+{ordData[ordData.length - 1]} orders</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="dash-card mt-1">
        <div className="dc-header"><h3>Top Products</h3></div>
        {topProducts.map((p, i) => (
          <div key={p.id} className="top-product">
            <span className="tp-rank">{i + 1}</span>
            <div className="tp-info">
              <span className="tp-name">{p.name}</span>
              <span className="tp-cat">{p.category}</span>
            </div>
            <div className="tp-bar-wrap">
              <div className="tp-bar" style={{ width: `${(p.sales / 100) * 100}%`, background: ['#ffc94b','#3b82f6','#8b5cf6','#22c55e','#f59e0b'][i] }} />
            </div>
            <span className="tp-val">{p.sales} sold</span>
            <span className="tp-price">${p.price}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─────────────── ORDERS PAGE ─────────────── */
function OrdersPage({ orders, onUpdateStatus, onRefresh }) {
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)
  const [sortBy, setSortBy] = useState('date-desc')
  const [page, setPage] = useState(1)
  const PER_PAGE = 8

  let filtered = filter === 'All' ? orders : orders.filter(o => o.status === filter)
  if (search) {
    const q = search.toLowerCase()
    filtered = filtered.filter(o =>
      o.id?.toLowerCase().includes(q) ||
      o.customer?.name?.toLowerCase().includes(q) ||
      o.customer?.email?.toLowerCase().includes(q)
    )
  }
  if (sortBy === 'date-desc') filtered = [...filtered].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  if (sortBy === 'date-asc') filtered = [...filtered].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
  if (sortBy === 'total-desc') filtered = [...filtered].sort((a, b) => b.total - a.total)
  if (sortBy === 'total-asc') filtered = [...filtered].sort((a, b) => a.total - b.total)

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <h2>Orders</h2>
          <p className="page-sub">Manage and track all customer orders</p>
        </div>
        <button className="btn-primary" onClick={onRefresh}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>
          Refresh
        </button>
      </div>

      <div className="orders-toolbar">
        <div className="search-box">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1) }}
            placeholder="Search by order ID, name, email..."
          />
          {search && <button className="search-clear" onClick={() => setSearch('')}>✕</button>}
        </div>
        <select className="sort-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="date-desc">Newest First</option>
          <option value="date-asc">Oldest First</option>
          <option value="total-desc">Highest Total</option>
          <option value="total-asc">Lowest Total</option>
        </select>
      </div>

      <div className="filter-tabs">
        {['All', ...STATUSES].map(s => (
          <button
            key={s}
            className={`ftab ${filter === s ? 'active' : ''}`}
            style={filter === s && s !== 'All' ? { borderColor: STATUS_COLORS[s], color: STATUS_COLORS[s] } : {}}
            onClick={() => { setFilter(s); setPage(1) }}
          >
            {s !== 'All' && <span className="ftab-dot" style={{ background: STATUS_COLORS[s] }} />}
            {s}
            <span className="ftab-count">
              {s === 'All' ? orders.length : orders.filter(o => o.status === s).length}
            </span>
          </button>
        ))}
      </div>

      <div className="orders-layout">
        <div className="orders-table-wrap">
          {paginated.length === 0 ? (
            <div className="empty-state"><span>📭</span><p>No orders found</p></div>
          ) : (
            <>
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map(order => (
                    <tr
                      key={order.id}
                      className={selected?.id === order.id ? 'row-active' : ''}
                      onClick={() => setSelected(selected?.id === order.id ? null : order)}
                    >
                      <td><span className="tbl-id">#{order.id}</span></td>
                      <td>
                        <div className="tbl-customer">
                          <div className="tbl-avatar">{order.customer?.name?.[0] || '?'}</div>
                          <div>
                            <span className="tbl-name">{order.customer?.name || '—'}</span>
                            <span className="tbl-email">{order.customer?.email || ''}</span>
                          </div>
                        </div>
                      </td>
                      <td><span className="tbl-items">{order.items?.length || 0} item(s)</span></td>
                      <td><strong className="tbl-amt">${order.total?.toFixed(2)}</strong></td>
                      <td>
                        <span className="tbl-status" style={{ background: STATUS_COLORS[order.status] + '20', color: STATUS_COLORS[order.status] }}>
                          {STATUS_ICONS[order.status]} {order.status}
                        </span>
                      </td>
                      <td className="tbl-date">{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td>
                        <button className="tbl-view-btn" onClick={e => { e.stopPropagation(); setSelected(selected?.id === order.id ? null : order) }}>
                          {selected?.id === order.id ? 'Close' : 'View'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="pagination">
                <span className="pg-info">{filtered.length} order(s)</span>
                <div className="pg-btns">
                  <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>‹</button>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button key={i} className={page === i + 1 ? 'pg-active' : ''} onClick={() => setPage(i + 1)}>
                      {i + 1}
                    </button>
                  ))}
                  <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>›</button>
                </div>
              </div>
            </>
          )}
        </div>

        {selected && (
          <OrderDetail
            order={selected}
            onClose={() => setSelected(null)}
            onUpdateStatus={(id, s) => { onUpdateStatus(id, s); setSelected(prev => ({ ...prev, status: s })) }}
          />
        )}
      </div>
    </div>
  )
}

/* ─────────────── ORDER DETAIL ─────────────── */
function OrderDetail({ order, onClose, onUpdateStatus }) {
  const [updating, setUpdating] = useState(false)

  const handleUpdate = async (status) => {
    setUpdating(true)
    await onUpdateStatus(order.id, status)
    setUpdating(false)
  }

  return (
    <div className="order-detail-panel">
      <div className="odp-header">
        <div>
          <h3>Order #{order.id}</h3>
          <span className="tbl-status" style={{ background: STATUS_COLORS[order.status] + '20', color: STATUS_COLORS[order.status] }}>
            {STATUS_ICONS[order.status]} {order.status}
          </span>
        </div>
        <button className="odp-close" onClick={onClose}>✕</button>
      </div>

      <div className="odp-pipeline">
        {STATUSES.map((s, i) => {
          const ci = STATUSES.indexOf(order.status)
          const done = i <= ci
          return (
            <div key={s} className="pip-step">
              <div className={`pip-dot ${done ? 'done' : ''}`} style={done ? { background: STATUS_COLORS[s], borderColor: STATUS_COLORS[s] } : {}}>
                {done ? '✓' : i + 1}
              </div>
              <span className={done ? 'done' : ''}>{s}</span>
              {i < STATUSES.length - 1 && <div className={`pip-line ${i < ci ? 'done' : ''}`} />}
            </div>
          )
        })}
      </div>

      <div className="odp-section">
        <h4>Update Status</h4>
        <div className="status-btns">
          {STATUSES.map(s => (
            <button
              key={s}
              className={`st-btn ${order.status === s ? 'current' : ''}`}
              style={order.status === s ? { background: STATUS_COLORS[s], borderColor: STATUS_COLORS[s], color: 'white' } : {}}
              onClick={() => handleUpdate(s)}
              disabled={updating}
            >
              {STATUS_ICONS[s]} {s}
            </button>
          ))}
        </div>
      </div>

      <div className="odp-section">
        <h4>Customer Info</h4>
        <div className="info-grid">
          <div><span>Name</span><strong>{order.customer?.name || '—'}</strong></div>
          <div><span>Email</span><strong>{order.customer?.email || '—'}</strong></div>
          <div><span>Phone</span><strong>{order.customer?.phone || '—'}</strong></div>
          <div><span>Address</span><strong>{order.customer?.address || '—'}</strong></div>
        </div>
      </div>

      <div className="odp-section">
        <h4>Items Ordered</h4>
        {order.items?.map(item => (
          <div key={item.id} className="odp-item">
            <div className="odp-item-icon">{item.image || '📦'}</div>
            <div className="odp-item-info">
              <span>{item.name}</span>
              <small>x{item.qty} · ${item.price} each</small>
            </div>
            <strong>${(item.price * item.qty).toFixed(2)}</strong>
          </div>
        ))}
        <div className="odp-total">
          <span>Total Paid</span>
          <strong>${order.total?.toFixed(2)}</strong>
        </div>
      </div>

      <div className="odp-section">
        <h4>Payment</h4>
        <p className="payment-id">{order.paymentIntentId || 'N/A'}</p>
        <p className="odp-date">Ordered: {new Date(order.createdAt).toLocaleString()}</p>
      </div>
    </div>
  )
}

/* ─────────────── PRODUCTS PAGE ─────────────── */
function ProductsPage({ products }) {
  const [search, setSearch] = useState('')
  const [catFilter, setCatFilter] = useState('All')
  const [editProduct, setEditProduct] = useState(null)
  const [localProducts, setLocalProducts] = useState(products)
  const [showAdd, setShowAdd] = useState(false)

  useEffect(() => { setLocalProducts(products) }, [products])

  const categories = ['All', ...new Set(localProducts.map(p => p.category))]
  let filtered = catFilter === 'All' ? localProducts : localProducts.filter(p => p.category === catFilter)
  if (search) {
    const q = search.toLowerCase()
    filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))
  }

  const handleSave = (updated) => {
    setLocalProducts(prev => prev.map(p => p.id === updated.id ? updated : p))
    setEditProduct(null)
  }

  const handleDelete = (id) => {
    if (confirm('Delete this product?')) {
      setLocalProducts(prev => prev.filter(p => p.id !== id))
    }
  }

  const handleAdd = (newP) => {
    setLocalProducts(prev => [...prev, { ...newP, id: Date.now() }])
    setShowAdd(false)
  }

  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <h2>Products</h2>
          <p className="page-sub">{localProducts.length} products in catalog</p>
        </div>
        <button className="btn-primary" onClick={() => setShowAdd(true)}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Add Product
        </button>
      </div>

      <div className="orders-toolbar">
        <div className="search-box">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..." />
          {search && <button className="search-clear" onClick={() => setSearch('')}>✕</button>}
        </div>
        <div className="cat-filters">
          {categories.map(c => (
            <button key={c} className={`ftab ${catFilter === c ? 'active' : ''}`} onClick={() => setCatFilter(c)}>{c}</button>
          ))}
        </div>
      </div>

      <div className="products-grid">
        {filtered.map(p => (
          <div key={p.id} className="prod-card">
            <div className="prod-card-top">
              {p.badge && <span className="prod-badge">{p.badge}</span>}
              <div className="prod-cat-tag">{p.category}</div>
            </div>
            <div className="prod-name">{p.name}</div>
            <div className="prod-meta">
              <span className="prod-price">${p.price}</span>
              {p.originalPrice && <span className="prod-orig">${p.originalPrice}</span>}
            </div>
            <div className="prod-stats">
              <span>⭐ {p.rating}</span>
              <span>📦 Stock: {p.stock}</span>
            </div>
            <div className="prod-actions">
              <button className="prod-edit-btn" onClick={() => setEditProduct(p)}>Edit</button>
              <button className="prod-del-btn" onClick={() => handleDelete(p.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {(editProduct || showAdd) && (
        <ProductModal
          product={editProduct}
          onSave={editProduct ? handleSave : handleAdd}
          onClose={() => { setEditProduct(null); setShowAdd(false) }}
        />
      )}
    </div>
  )
}

/* ─────────────── PRODUCT MODAL ─────────────── */
function ProductModal({ product, onSave, onClose }) {
  const [form, setForm] = useState(product || { name: '', category: '', price: '', originalPrice: '', stock: '', rating: '', badge: '', description: '' })

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-card">
        <div className="modal-header">
          <h3>{product ? 'Edit Product' : 'Add Product'}</h3>
          <button className="odp-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <div className="modal-grid">
            <div className="modal-field">
              <label>Product Name</label>
              <input value={form.name} onChange={e => set('name', e.target.value)} placeholder="e.g. ProX Headphones" />
            </div>
            <div className="modal-field">
              <label>Category</label>
              <input value={form.category} onChange={e => set('category', e.target.value)} placeholder="e.g. Audio" />
            </div>
            <div className="modal-field">
              <label>Price ($)</label>
              <input type="number" value={form.price} onChange={e => set('price', e.target.value)} placeholder="299" />
            </div>
            <div className="modal-field">
              <label>Original Price ($)</label>
              <input type="number" value={form.originalPrice} onChange={e => set('originalPrice', e.target.value)} placeholder="399" />
            </div>
            <div className="modal-field">
              <label>Stock</label>
              <input type="number" value={form.stock} onChange={e => set('stock', e.target.value)} placeholder="15" />
            </div>
            <div className="modal-field">
              <label>Rating</label>
              <input type="number" step="0.1" max="5" value={form.rating} onChange={e => set('rating', e.target.value)} placeholder="4.8" />
            </div>
            <div className="modal-field">
              <label>Badge</label>
              <input value={form.badge || ''} onChange={e => set('badge', e.target.value)} placeholder="Best Seller, New, Sale..." />
            </div>
          </div>
          <div className="modal-field mt-1">
            <label>Description</label>
            <textarea value={form.description} onChange={e => set('description', e.target.value)} rows={3} placeholder="Product description..." />
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={() => onSave({ ...form, price: Number(form.price), originalPrice: Number(form.originalPrice), stock: Number(form.stock), rating: Number(form.rating) })}>
            {product ? 'Save Changes' : 'Add Product'}
          </button>
        </div>
      </div>
    </div>
  )
}

/* ─────────────── ANALYTICS PAGE ─────────────── */
function AnalyticsPage({ orders }) {
  const revenue = orders.reduce((s, o) => s + (o.total || 0), 0)
  const avgOrder = orders.length ? revenue / orders.length : 0

  const byStatus = STATUSES.map(s => ({
    label: s,
    count: orders.filter(o => o.status === s).length,
    color: STATUS_COLORS[s]
  }))
  const maxCount = Math.max(...byStatus.map(s => s.count), 1)

  // Revenue by day (fake)
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const dailyRev = [320, 450, 280, 600, 520, 780, 640]
  const maxRev = Math.max(...dailyRev)

  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <h2>Analytics</h2>
          <p className="page-sub">Performance metrics and insights</p>
        </div>
      </div>

      <div className="stats-grid">
        <StatCard icon="💰" label="Total Revenue" value={`$${revenue.toFixed(2)}`} color="#ffc94b" />
        <StatCard icon="🛒" label="Total Orders" value={orders.length} color="#3b82f6" />
        <StatCard icon="📊" label="Avg Order Value" value={`$${avgOrder.toFixed(2)}`} color="#8b5cf6" />
        <StatCard icon="✅" label="Completion Rate" value={orders.length ? `${Math.round((orders.filter(o => o.status === 'Delivered').length / orders.length) * 100)}%` : '0%'} color="#22c55e" />
      </div>

      <div className="dash-row">
        <div className="dash-card wide">
          <div className="dc-header"><h3>Weekly Revenue</h3></div>
          <div className="bar-chart">
            {days.map((d, i) => (
              <div key={d} className="bar-col">
                <div className="bar-wrap">
                  <div className="bar-fill" style={{ height: `${(dailyRev[i] / maxRev) * 100}%`, background: 'linear-gradient(180deg, #ffc94b, #e6a800)' }} />
                </div>
                <span className="bar-label">{d}</span>
                <span className="bar-val">${dailyRev[i]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="dash-card">
          <div className="dc-header"><h3>Orders by Status</h3></div>
          <div className="status-breakdown">
            {byStatus.map(s => (
              <div key={s.label} className="sb-row">
                <span className="sb-label">
                  <span className="sb-dot" style={{ background: s.color }} />
                  {s.label}
                </span>
                <div className="sb-bar-wrap">
                  <div className="sb-bar" style={{ width: `${maxCount ? (s.count / maxCount) * 100 : 0}%`, background: s.color }} />
                </div>
                <span className="sb-cnt">{s.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="dash-card mt-1">
        <div className="dc-header"><h3>Key Metrics</h3></div>
        <div className="metrics-grid">
          <div className="metric-item">
            <div className="metric-icon" style={{ background: '#ffc94b18', color: '#ffc94b' }}>💰</div>
            <div><p>Revenue</p><strong>${revenue.toFixed(2)}</strong></div>
          </div>
          <div className="metric-item">
            <div className="metric-icon" style={{ background: '#3b82f618', color: '#3b82f6' }}>📦</div>
            <div><p>Orders</p><strong>{orders.length}</strong></div>
          </div>
          <div className="metric-item">
            <div className="metric-icon" style={{ background: '#22c55e18', color: '#22c55e' }}>✅</div>
            <div><p>Delivered</p><strong>{orders.filter(o => o.status === 'Delivered').length}</strong></div>
          </div>
          <div className="metric-item">
            <div className="metric-icon" style={{ background: '#f59e0b18', color: '#f59e0b' }}>⏳</div>
            <div><p>Pending</p><strong>{orders.filter(o => o.status === 'Pending').length}</strong></div>
          </div>
          <div className="metric-item">
            <div className="metric-icon" style={{ background: '#8b5cf618', color: '#8b5cf6' }}>🚚</div>
            <div><p>Shipped</p><strong>{orders.filter(o => o.status === 'Shipped').length}</strong></div>
          </div>
          <div className="metric-item">
            <div className="metric-icon" style={{ background: '#ec489918', color: '#ec4899' }}>📊</div>
            <div><p>Avg Value</p><strong>${avgOrder.toFixed(2)}</strong></div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────── SETTINGS PAGE ─────────────── */
function SettingsPage({ onLogout }) {
  const [settings, setSettings] = useState({
    storeName: 'TechStore',
    email: 'admin@techstore.com',
    currency: 'USD',
    autoRefresh: true,
    refreshInterval: 10,
    notifications: true,
    darkMode: true,
  })
  const [saved, setSaved] = useState(false)

  const set = (k, v) => setSettings(s => ({ ...s, [k]: v }))
  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <h2>Settings</h2>
          <p className="page-sub">Manage your store configuration</p>
        </div>
        <button className="btn-primary" onClick={handleSave}>
          {saved ? '✅ Saved!' : 'Save Changes'}
        </button>
      </div>

      <div className="settings-grid">
        <div className="settings-card">
          <h3>Store Information</h3>
          <div className="settings-fields">
            <div className="modal-field">
              <label>Store Name</label>
              <input value={settings.storeName} onChange={e => set('storeName', e.target.value)} />
            </div>
            <div className="modal-field">
              <label>Admin Email</label>
              <input value={settings.email} onChange={e => set('email', e.target.value)} />
            </div>
            <div className="modal-field">
              <label>Currency</label>
              <select value={settings.currency} onChange={e => set('currency', e.target.value)} className="sort-select" style={{ width: '100%' }}>
                <option>USD</option>
                <option>EUR</option>
                <option>GBP</option>
                <option>PKR</option>
              </select>
            </div>
          </div>
        </div>

        <div className="settings-card">
          <h3>Dashboard Preferences</h3>
          <div className="settings-fields">
            <div className="toggle-row">
              <div>
                <strong>Auto Refresh Orders</strong>
                <p>Automatically refresh order list</p>
              </div>
              <label className="toggle">
                <input type="checkbox" checked={settings.autoRefresh} onChange={e => set('autoRefresh', e.target.checked)} />
                <span className="toggle-slider" />
              </label>
            </div>
            <div className="modal-field">
              <label>Refresh Interval (seconds)</label>
              <input type="number" value={settings.refreshInterval} onChange={e => set('refreshInterval', e.target.value)} disabled={!settings.autoRefresh} />
            </div>
            <div className="toggle-row">
              <div>
                <strong>Notifications</strong>
                <p>Get notified on new orders</p>
              </div>
              <label className="toggle">
                <input type="checkbox" checked={settings.notifications} onChange={e => set('notifications', e.target.checked)} />
                <span className="toggle-slider" />
              </label>
            </div>
          </div>
        </div>

        <div className="settings-card danger-card">
          <h3>Danger Zone</h3>
          <p>These actions are irreversible. Please proceed with caution.</p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1.2rem' }}>
            <button className="btn-danger" onClick={onLogout}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────── MAIN ADMIN ─────────────── */
function Admin() {
  const [auth, setAuth] = useState(localStorage.getItem('adminAuth') === 'true')
  const [orders, setOrders] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [activePage, setActivePage] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const fetchOrders = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/orders')
      const data = await res.json()
      setOrders(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const fetchProducts = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/products')
      const data = await res.json()
      setProducts(data.data || [])
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (auth) {
      fetchOrders()
      fetchProducts()
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
  }

  const handleLogout = () => {
    localStorage.removeItem('adminAuth')
    setAuth(false)
  }

  if (!auth) return <AdminLogin onLogin={() => setAuth(true)} />

  const pendingCount = orders.filter(o => o.status === 'Pending').length

  return (
    <div className={`admin-shell ${sidebarOpen ? '' : 'sidebar-collapsed'}`}>
      <Sidebar
        active={activePage}
        setActive={setActivePage}
        onLogout={handleLogout}
        orderCount={pendingCount}
      />

      <div className="admin-main">
        <header className="admin-topbar">
          <button className="topbar-toggle" onClick={() => setSidebarOpen(s => !s)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
          <div className="topbar-breadcrumb">
            <span>Admin</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
            <span className="bc-active">{NAV_ITEMS.find(n => n.id === activePage)?.label}</span>
          </div>
          <div className="topbar-right">
            <div className="topbar-date">{new Date().toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</div>
            {pendingCount > 0 && (
              <div className="topbar-alert" onClick={() => setActivePage('orders')}>
                🔔 <span>{pendingCount} pending</span>
              </div>
            )}
          </div>
        </header>

        {loading ? (
          <div className="admin-loading-full">
            <div className="loading-spinner" />
            <p>Loading dashboard...</p>
          </div>
        ) : (
          <>
            {activePage === 'dashboard' && <DashboardPage orders={orders} products={products} />}
            {activePage === 'orders' && <OrdersPage orders={orders} onUpdateStatus={updateStatus} onRefresh={fetchOrders} />}
            {activePage === 'products' && <ProductsPage products={products} />}
            {activePage === 'analytics' && <AnalyticsPage orders={orders} />}
            {activePage === 'settings' && <SettingsPage onLogout={handleLogout} />}
          </>
        )}
      </div>
    </div>
  )
}

export default Admin