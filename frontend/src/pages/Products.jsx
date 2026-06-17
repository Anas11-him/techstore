import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import './Products.css'


const allProducts = [
  { id: 1, name: 'ProMax X1 Laptop', category: 'Laptops', price: 1299, originalPrice: 1599, rating: 4.8, reviews: 234, badge: 'Best Seller', image: '💻', description: 'Ultra-thin 15.6" laptop with Intel i9, 32GB RAM, 1TB NVMe SSD.' },
  { id: 2, name: 'SoundPods Pro', category: 'Audio', price: 249, originalPrice: 299, rating: 4.9, reviews: 1847, badge: 'Top Rated', image: '🎧', description: 'Active noise cancellation earbuds with 30-hour battery life.' },
  { id: 3, name: 'SnapShot 4K Camera', category: 'Cameras', price: 899, originalPrice: 1099, rating: 4.7, reviews: 512, badge: 'Sale', image: '📷', description: 'Professional mirrorless camera with 4K 120fps video.' },
  { id: 4, name: 'UltraWatch S3', category: 'Wearables', price: 399, originalPrice: 449, rating: 4.6, reviews: 923, badge: 'New', image: '⌚', description: 'Premium smartwatch with AMOLED display and 7-day battery.' },
  { id: 5, name: 'GamePad Elite V2', category: 'Gaming', price: 179, originalPrice: 199, rating: 4.8, reviews: 3201, badge: 'Popular', image: '🎮', description: 'Pro gaming controller with haptic feedback and adaptive triggers.' },
  { id: 6, name: 'HoloPad Tablet 12', category: 'Tablets', price: 749, originalPrice: 849, rating: 4.7, reviews: 677, badge: 'Sale', image: '📱', description: '12-inch tablet with M2 chip and ProMotion 120Hz display.' },
  { id: 7, name: 'StreamBox 8K', category: 'TV & Home', price: 149, originalPrice: 199, rating: 4.5, reviews: 445, badge: 'New', image: '📺', description: 'Compact 8K streaming device with AI upscaling and Dolby Vision.' },
  { id: 8, name: 'DeskPad Wireless Charger', category: 'Accessories', price: 79, originalPrice: 99, rating: 4.4, reviews: 289, badge: '', image: '🔋', description: 'XL desk pad with integrated 15W wireless charging zones.' },
]

const categories = ['All', 'Laptops', 'Audio', 'Cameras', 'Wearables', 'Gaming', 'Tablets', 'TV & Home', 'Accessories']

function Products() {
  const { addToCart } = useCart()
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('default')
  const [added, setAdded] = useState({})

  const handleAdd = (product) => {
    addToCart(product)
    setAdded(prev => ({ ...prev, [product.id]: true }))
    setTimeout(() => setAdded(prev => ({ ...prev, [product.id]: false })), 1500)
  }

  let filtered = allProducts
  if (activeCategory !== 'All') filtered = filtered.filter(p => p.category === activeCategory)
  if (search) filtered = filtered.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
  if (sort === 'price-asc') filtered = [...filtered].sort((a, b) => a.price - b.price)
  if (sort === 'price-desc') filtered = [...filtered].sort((a, b) => b.price - a.price)
  if (sort === 'rating') filtered = [...filtered].sort((a, b) => b.rating - a.rating)

  return (
    <div className="products-page">

      {/* PAGE HEADER */}
      <div className="products-header">
        <h1>All <span>Products</span></h1>
        <p>Browse our full collection of premium tech</p>
      </div>

      {/* TOOLBAR */}
      <div className="products-toolbar">
        <input
          type="text"
          placeholder="🔍  Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="search-input"
        />
        <select value={sort} onChange={e => setSort(e.target.value)} className="sort-select">
          <option value="default">Sort: Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      {/* CATEGORIES */}
      <div className="cat-filters">
        {categories.map(cat => (
          <button
            key={cat}
            className={`cat-filter-btn ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* RESULTS COUNT */}
      <p className="results-count">{filtered.length} products found</p>

      {/* GRID */}
      <div className="products-grid">
        {filtered.length === 0 ? (
          <div className="no-results">
            <span>😕</span>
            <p>No products found</p>
          </div>
        ) : (
          filtered.map(p => (
            <div key={p.id} className="product-card" onClick={() => navigate(`/products/${p.id}`)} style={{ cursor: 'pointer' }}>
              {p.badge && <span className="p-badge">{p.badge}</span>}
              <div className="p-img">{p.image}</div>
              <div className="p-body">
                <span className="p-cat">{p.category}</span>
                <h3>{p.name}</h3>
                <p className="p-desc">{p.description}</p>
                <div className="p-rating">
                  {'★'.repeat(Math.floor(p.rating))}{'☆'.repeat(5 - Math.floor(p.rating))}
                  <span>{p.rating} ({p.reviews})</span>
                </div>
                <div className="p-footer">
                  <div className="p-price">
                    <strong>${p.price}</strong>
                    <s>${p.originalPrice}</s>
                  </div>
                  <button
                    className={`add-btn ${added[p.id] ? 'added' : ''}`}
                    onClick={(e) => { e.stopPropagation(); handleAdd(p) }}
                  >
                    {added[p.id] ? '✓ Added' : '+ Cart'}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Products