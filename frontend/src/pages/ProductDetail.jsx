import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import './ProductDetail.css'

const allProducts = [
  {
    id: 1, name: 'ProMax X1 Laptop', category: 'Laptops', price: 1299, originalPrice: 1599,
    rating: 4.8, reviews: 234, badge: 'Best Seller',
    images: ['💻', '🖥️', '⌨️', '🔋'],
    description: 'The ProMax X1 is our flagship ultra-thin laptop designed for professionals and creators. With an Intel Core i9 processor and 32GB of DDR5 RAM, it handles anything you throw at it — from 4K video editing to complex data analysis.',
    specs: { Processor: 'Intel Core i9-13900H', RAM: '32GB DDR5', Storage: '1TB NVMe SSD', Display: '15.6" OLED 120Hz', Battery: '72Wh — up to 12 hrs', Weight: '1.4 kg', OS: 'Windows 11 Pro' },
    features: ['Thunderbolt 4 ports', 'Backlit keyboard', 'Fingerprint reader', 'Wi-Fi 6E', 'Dolby Atmos speakers']
  },
  {
    id: 2, name: 'SoundPods Pro', category: 'Audio', price: 249, originalPrice: 299,
    rating: 4.9, reviews: 1847, badge: 'Top Rated',
    images: ['🎧', '🎵', '📻', '🔊'],
    description: 'SoundPods Pro deliver an immersive audio experience with hybrid active noise cancellation that blocks up to 40dB of ambient noise. Crystal-clear calls, spatial audio, and 30 hours of total battery life make these the ultimate earbuds.',
    specs: { Driver: '11mm Dynamic', ANC: 'Hybrid ANC -40dB', Battery: '8hrs + 22hrs case', Connectivity: 'Bluetooth 5.3', Waterproof: 'IPX5', Charging: 'USB-C + Wireless' },
    features: ['Spatial Audio', 'Transparency mode', 'Auto ear detection', 'Multipoint connection', 'Voice assistant support']
  },
  {
    id: 3, name: 'SnapShot 4K Camera', category: 'Cameras', price: 899, originalPrice: 1099,
    rating: 4.7, reviews: 512, badge: 'Sale',
    images: ['📷', '🎥', '🖼️', '🔭'],
    description: 'The SnapShot 4K is a professional mirrorless camera with a 45MP full-frame BSI sensor. Record 4K at 120fps in RAW format, take stunning portraits with AI subject tracking, and shoot confidently in any weather with IP53 sealing.',
    specs: { Sensor: '45MP Full-Frame BSI', Video: '4K 120fps RAW', Stabilization: '8-stop IBIS', Autofocus: 'AI Subject Tracking', Weather: 'IP53 sealed', Mount: 'L-Mount' },
    features: ['Dual card slots', 'CFexpress + SD', 'Live composite mode', 'Focus stacking', 'Wired + wireless tethering']
  },
  {
    id: 4, name: 'UltraWatch S3', category: 'Wearables', price: 399, originalPrice: 449,
    rating: 4.6, reviews: 923, badge: 'New',
    images: ['⌚', '💪', '❤️', '🏃'],
    description: 'UltraWatch S3 combines premium design with advanced health tracking. The 1.9" AMOLED always-on display looks stunning while ECG, SpO2, and continuous heart rate monitoring keep you informed about your health 24/7.',
    specs: { Display: '1.9" AMOLED AOD', Battery: '7 days typical', Sensors: 'ECG, SpO2, GPS', Waterproof: '5ATM', OS: 'WatchOS 4', Strap: '22mm quick-release' },
    features: ['Sleep tracking', 'Stress monitoring', 'Fall detection', 'Period tracking', '100+ workout modes']
  },
  {
    id: 5, name: 'GamePad Elite V2', category: 'Gaming', price: 179, originalPrice: 199,
    rating: 4.8, reviews: 3201, badge: 'Popular',
    images: ['🎮', '🕹️', '⚡', '🏆'],
    description: 'The GamePad Elite V2 is built for competitive gaming. Adaptive triggers with variable resistance, HD haptic motors for immersive feedback, and a 40-hour wireless battery ensure you never lose your edge during long sessions.',
    specs: { Connectivity: 'USB-C + Wireless 2.4GHz', Battery: '40 hours', Triggers: 'Adaptive Force', Rumble: 'HD Haptic Motors', Compatibility: 'PC / PS5 / Mobile', Weight: '268g' },
    features: ['Remappable buttons', 'Hair trigger mode', 'Built-in mic', 'Share button', '3.5mm headphone jack']
  },
  {
    id: 6, name: 'HoloPad Tablet 12', category: 'Tablets', price: 749, originalPrice: 849,
    rating: 4.7, reviews: 677, badge: 'Sale',
    images: ['📱', '✏️', '🎨', '📚'],
    description: 'HoloPad Tablet 12 is powered by the M2 chip with a stunning 12" Liquid Retina ProMotion 120Hz display. Whether you are drawing, watching, or working, the all-day 18-hour battery and Apple Pencil support make it the ultimate creative tablet.',
    specs: { Chip: 'M2 Octa-core', Display: '12" Liquid Retina 120Hz', RAM: '16GB', Storage: '256GB', Camera: '12MP Ultra-wide + LiDAR', Battery: '18 hours' },
    features: ['Apple Pencil support', 'Magic Keyboard compatible', 'Face ID', 'Thunderbolt 4', 'Center Stage camera']
  },
  {
    id: 7, name: 'StreamBox 8K', category: 'TV & Home', price: 149, originalPrice: 199,
    rating: 4.5, reviews: 445, badge: 'New',
    images: ['📺', '🎬', '🎭', '📡'],
    description: 'StreamBox 8K upscales any content to near-8K quality using AI processing. Dolby Vision, HDR10+, and Dolby Atmos support deliver cinema-quality audio and visuals. All your favourite streaming apps are built in.',
    specs: { Resolution: '8K AI Upscaling', HDR: 'Dolby Vision + HDR10+', Audio: 'Dolby Atmos', Ports: 'HDMI 2.1 + USB-A', Voice: 'Alexa + Google', WiFi: 'WiFi 6' },
    features: ['All streaming apps built-in', 'Voice remote', 'Apple AirPlay', 'Google Cast', 'Auto low latency mode']
  },
  {
    id: 8, name: 'DeskPad Wireless Charger', category: 'Accessories', price: 79, originalPrice: 99,
    rating: 4.4, reviews: 289, badge: '',
    images: ['🔋', '⚡', '🖥️', '💡'],
    description: 'The DeskPad Wireless Charger is an XL vegan leather desk mat with two integrated 15W wireless charging zones and a 100W USB-C PD pass-through port. Keep your workspace clean and your devices powered all day.',
    specs: { Charging: '15W Fast Wireless x2', USBC: '100W PD Pass-through', Material: 'Vegan leather', Size: '90 x 40cm', Compatibility: 'Qi / MagSafe', Color: 'Midnight Black' },
    features: ['Anti-slip base', 'Cable management', 'LED charging indicator', 'Water-resistant surface', 'Works with all Qi devices']
  },
]

function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [activeImg, setActiveImg] = useState(0)
  const [added, setAdded] = useState(false)
  const [qty, setQty] = useState(1)

  const product = allProducts.find(p => p.id === parseInt(id))

  if (!product) return (
    <div className="pd-notfound">
      <span>😕</span>
      <h2>Product not found</h2>
      <button onClick={() => navigate('/products')}>← Back to Products</button>
    </div>
  )

  const discount = Math.round((1 - product.price / product.originalPrice) * 100)

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="pd-page">

      {/* BREADCRUMB */}
      <div className="pd-breadcrumb">
        <span onClick={() => navigate('/')}>Home</span>
        <span>›</span>
        <span onClick={() => navigate('/products')}>Products</span>
        <span>›</span>
        <span className="active">{product.name}</span>
      </div>

      <div className="pd-layout">

        {/* IMAGES */}
        <div className="pd-images">
          <div className="pd-main-img">
            <div className="pd-main-emoji">{product.images[activeImg]}</div>
            {product.badge && <span className="pd-badge">{product.badge}</span>}
            <span className="pd-discount">-{discount}%</span>
          </div>
          <div className="pd-thumbs">
            {product.images.map((img, i) => (
              <div
                key={i}
                className={`pd-thumb ${activeImg === i ? 'active' : ''}`}
                onClick={() => setActiveImg(i)}
              >
                {img}
              </div>
            ))}
          </div>
        </div>

        {/* INFO */}
        <div className="pd-info">
          <span className="pd-cat">{product.category}</span>
          <h1>{product.name}</h1>

          <div className="pd-rating">
            {'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.floor(product.rating))}
            <span>{product.rating} · {product.reviews.toLocaleString()} reviews</span>
          </div>

          <div className="pd-price">
            <strong>${product.price}</strong>
            <s>${product.originalPrice}</s>
            <span className="pd-save">Save ${product.originalPrice - product.price}</span>
          </div>

          <p className="pd-desc">{product.description}</p>

          {/* FEATURES */}
          <div className="pd-features">
            {product.features.map((f, i) => (
              <span key={i} className="pd-feature">✓ {f}</span>
            ))}
          </div>

          {/* QTY + ADD */}
          <div className="pd-actions">
            <div className="pd-qty">
              <button onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
              <span>{qty}</span>
              <button onClick={() => setQty(q => q + 1)}>+</button>
            </div>
            <button className={`pd-add-btn ${added ? 'added' : ''}`} onClick={handleAdd}>
              {added ? '✓ Added to Cart!' : 'Add to Cart'}
            </button>
          </div>

          <button className="pd-buy-btn" onClick={() => { handleAdd(); navigate('/cart') }}>
            Buy Now →
          </button>

          {/* SPECS */}
          <div className="pd-specs">
            <h3>Specifications</h3>
            <div className="pd-specs-grid">
              {Object.entries(product.specs).map(([key, val]) => (
                <div key={key} className="pd-spec-row">
                  <span>{key}</span>
                  <strong>{val}</strong>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* RELATED */}
      <div className="pd-related">
        <h2>You Might Also Like</h2>
        <div className="pd-related-grid">
          {allProducts.filter(p => p.id !== product.id).slice(0, 4).map(p => (
            <div key={p.id} className="pd-related-card" onClick={() => { navigate(`/products/${p.id}`); setActiveImg(0) }}>
              <div className="pd-related-img">{p.images[0]}</div>
              <div className="pd-related-info">
                <p>{p.name}</p>
                <strong>${p.price}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default ProductDetail