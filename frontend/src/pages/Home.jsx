import { Link } from 'react-router-dom'
import './Home.css'

const featured = [
  { id: 1, name: 'ProMax X1 Laptop', category: 'Laptops', price: 1299, originalPrice: 1599, badge: 'Best Seller', image: '💻' },
  { id: 2, name: 'SoundPods Pro', category: 'Audio', price: 249, originalPrice: 299, badge: 'Top Rated', image: '🎧' },
  { id: 3, name: 'SnapShot 4K Camera', category: 'Cameras', price: 899, originalPrice: 1099, badge: 'Sale', image: '📷' },
  { id: 4, name: 'UltraWatch S3', category: 'Wearables', price: 399, originalPrice: 449, badge: 'New', image: '⌚' },
]

const categories = [
  { name: 'Laptops', icon: '💻', count: '12 Products' },
  { name: 'Audio', icon: '🎧', count: '8 Products' },
  { name: 'Cameras', icon: '📷', count: '6 Products' },
  { name: 'Wearables', icon: '⌚', count: '9 Products' },
  { name: 'Gaming', icon: '🎮', count: '15 Products' },
  { name: 'Tablets', icon: '📱', count: '7 Products' },
]

function Home() {
  return (
    <div className="home">

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg"></div>
        <div className="hero-content">
          <span className="hero-tag">New Arrivals 2026</span>
          <h1>Next-Level <span>Tech</span><br />For Everyone</h1>
          <p>Discover the latest gadgets, laptops, audio gear and more. Premium quality at unbeatable prices.</p>
          <div className="hero-btns">
            <Link to="/products" className="btn-primary">Shop Now →</Link>
            <Link to="/products" className="btn-outline">View Deals</Link>
          </div>
          <div className="hero-stats">
            <div><strong>500+</strong><span>Products</span></div>
            <div><strong>50k+</strong><span>Customers</span></div>
            <div><strong>4.9★</strong><span>Rating</span></div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-circle">
            <div className="hero-emoji">💻</div>
          </div>
          <div className="floating-card card1">
            <span>🎧</span>
            <div>
              <p>SoundPods Pro</p>
              <strong>$249</strong>
            </div>
          </div>
          <div className="floating-card card2">
            <span>⌚</span>
            <div>
              <p>UltraWatch S3</p>
              <strong>$399</strong>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="categories">
        <div className="section-header">
          <p>Browse By</p>
          <h2>Shop Categories</h2>
        </div>
        <div className="categories-grid">
          {categories.map(cat => (
            <Link to={`/products?category=${cat.name}`} key={cat.name} className="cat-card">
              <span className="cat-icon">{cat.icon}</span>
              <h3>{cat.name}</h3>
              <p>{cat.count}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="featured">
        <div className="section-header">
          <p>Hand Picked</p>
          <h2>Featured Products</h2>
          <Link to="/products" className="see-all">See All →</Link>
        </div>
        <div className="featured-grid">
          {featured.map(p => (
            <div key={p.id} className="feat-card">
              {p.badge && <span className="feat-badge">{p.badge}</span>}
              <div className="feat-img">{p.image}</div>
              <div className="feat-body">
                <span className="feat-cat">{p.category}</span>
                <h3>{p.name}</h3>
                <div className="feat-price">
                  <strong>${p.price}</strong>
                  <s>${p.originalPrice}</s>
                </div>
                <Link to="/products" className="feat-btn">Add to Cart</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BANNER */}
      <section className="promo-banner">
        <div className="promo-content">
          <h2>Get 20% Off Your First Order</h2>
          <p>Use code <strong>TECH20</strong> at checkout. Limited time offer.</p>
          <Link to="/products" className="btn-primary">Claim Offer</Link>
        </div>
      </section>

      {/* FOOTER */}
      {/* FOOTER */}
<footer className="footer">
  <div className="footer-top">
    <div className="footer-brand">
      <div className="footer-logo">Tech<span>Store</span></div>
      <p>Premium tech products at unbeatable prices. All items are genuine, tested and come with warranty.</p>
    </div>
    <div className="footer-col">
      <h4>Quick Links</h4>
      <a href="/">Home</a>
      <a href="/products">Products</a>
      <a href="/cart">Cart</a>
      <a href="/checkout">Checkout</a>
    </div>
    <div className="footer-col">
      <h4>Customer Care</h4>
      <a href="#">Return Policy</a>
      <a href="#">Track Order</a>
      <a href="#">FAQs</a>
      <a href="#">About Us</a>
    </div>
    <div className="footer-col">
      <h4>Contact Us</h4>
      <div className="footer-contact">
        <span>📞</span>
        <div>
          <p>Got Questions? Call Us 24/7</p>
          <strong>+92 3253000192</strong>
        </div>
      </div>
      <div className="footer-contact">
        <span>📍</span>
        <div>
          <p>Address</p>
          <strong>Wapda City, Faisalabad</strong>
        </div>
      </div>
      <div className="footer-contact">
        <span>👤</span>
        <div>
          <p>Owner</p>
          <strong>Muhammad Anas</strong>
        </div>
      </div>
    </div>
  </div>
  <div className="footer-bottom">
    <p>© 2025 TechStore. All rights reserved.</p>
    <p>Made by Muhammad Anas</p>
  </div>
</footer>

    </div>
  )
}

export default Home