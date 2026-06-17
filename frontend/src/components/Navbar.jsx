import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import './Navbar.css'

const allProducts = [
  { id: 1, name: 'ProMax X1 Laptop', category: 'Laptops', price: 1299, image: '💻' },
  { id: 2, name: 'SoundPods Pro', category: 'Audio', price: 249, image: '🎧' },
  { id: 3, name: 'SnapShot 4K Camera', category: 'Cameras', price: 899, image: '📷' },
  { id: 4, name: 'UltraWatch S3', category: 'Wearables', price: 399, image: '⌚' },
  { id: 5, name: 'GamePad Elite V2', category: 'Gaming', price: 179, image: '🎮' },
  { id: 6, name: 'HoloPad Tablet 12', category: 'Tablets', price: 749, image: '📱' },
  { id: 7, name: 'StreamBox 8K', category: 'TV & Home', price: 149, image: '📺' },
  { id: 8, name: 'DeskPad Wireless Charger', category: 'Accessories', price: 79, image: '🔋' },
]

function Navbar() {
  const { count } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [results, setResults] = useState([])
  const [showResults, setShowResults] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const searchRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setSearch('')
    setShowResults(false)
  }, [location])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowResults(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = (val) => {
    setSearch(val)
    if (val.trim().length === 0) {
      setResults([])
      setShowResults(false)
      return
    }
    const filtered = allProducts.filter(p =>
      p.name.toLowerCase().includes(val.toLowerCase()) ||
      p.category.toLowerCase().includes(val.toLowerCase())
    )
    setResults(filtered)
    setShowResults(true)
  }

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter' && search.trim()) {
      navigate(`/products?search=${search}`)
      setShowResults(false)
    }
  }

  const handleResultClick = (id) => {
    navigate(`/products/${id}`)
    setSearch('')
    setShowResults(false)
  }

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <Link to="/" className="nav-logo">
        Tech<span>Store</span>
      </Link>

      {/* SEARCH BAR */}
      <div className="nav-search" ref={searchRef}>
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={e => handleSearch(e.target.value)}
            onKeyDown={handleSearchSubmit}
            onFocus={() => search && setShowResults(true)}
          />
          {search && (
            <button className="search-clear" onClick={() => { setSearch(''); setShowResults(false) }}>✕</button>
          )}
        </div>

        {/* DROPDOWN RESULTS */}
        {showResults && (
          <div className="search-dropdown">
            {results.length === 0 ? (
              <div className="search-no-results">No products found for "{search}"</div>
            ) : (
              <>
                <div className="search-dropdown-header">
                  {results.length} result{results.length > 1 ? 's' : ''} found
                </div>
                {results.map(p => (
                  <div key={p.id} className="search-result-item" onClick={() => handleResultClick(p.id)}>
                    <span className="result-emoji">{p.image}</span>
                    <div className="result-info">
                      <p>{p.name}</p>
                      <small>{p.category}</small>
                    </div>
                    <strong>${p.price}</strong>
                  </div>
                ))}
                <div className="search-view-all" onClick={() => { navigate(`/products?search=${search}`); setShowResults(false) }}>
                  View all results for "{search}" →
                </div>
              </>
            )}
          </div>
        )}
      </div>

      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link></li>
        <li><Link to="/products" className={location.pathname === '/products' ? 'active' : ''}>Products</Link></li>
        <li>
          <Link to="/cart" className="nav-cart">
            Cart
            {count > 0 && <span className="cart-badge">{count}</span>}
          </Link>
        </li>
      </ul>

      <button className={`hamburger ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
        <span></span><span></span><span></span>
      </button>
    </nav>
  )
}

export default Navbar