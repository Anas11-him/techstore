import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import './Checkout.css'

const stripePromise = loadStripe('pk_test_51TfO0eJGZX1aVwmYTFyYcXFSpsB2uq66C08wuu2WxbK4Tw8Rg3iceWoAugZlcnV97OPNvk43Xr2pBEFAhFaxz0Md00Jx61RkHD')

// ── Payment Form ──────────────────────────────────────────
function PaymentForm({ total, form, items, onSuccess })  {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handlePay = async () => {
    if (!stripe || !elements) return
    setLoading(true)
    setError('')

    try {
      // 1. Create payment intent on backend
      const res = await fetch('http://localhost:5000/api/payments/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: total * 1.08 })
      })
      const { clientSecret, error: backendError } = await res.json()
      if (backendError) throw new Error(backendError)

      // 2. Confirm payment with Stripe
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: `${form.firstName} ${form.lastName}`,
            email: form.email,
          }
        }
      })

      if (stripeError) throw new Error(stripeError.message)

      if (paymentIntent.status === 'succeeded') {
  await fetch('http://localhost:5000/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      customer: {
        name: `${form.firstName} ${form.lastName}`,
        email: form.email,
        phone: form.phone,
        address: `${form.address}, ${form.city} ${form.zip}, ${form.country}`
      },
      items: items,
      total: total * 1.08,
      paymentIntentId: paymentIntent.id
    })
    
  })
  onSuccess()
}

    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="stripe-form">
      <div className="card-element-wrapper">
        <label>Card Details</label>
        <div className="card-element-box">
          <CardElement options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#0d2426',
                fontFamily: 'DM Sans, sans-serif',
                '::placeholder': { color: '#a0b0b1' }
              },
              invalid: { color: '#e53e3e' }
            }
          }} />
        </div>
      </div>

      {error && <div className="stripe-error">⚠️ {error}</div>}

      <div className="test-cards">
        <p>🧪 Test card: <strong>4242 4242 4242 4242</strong> · Any future date · Any CVV</p>
      </div>

      <button
        className="place-order-btn"
        onClick={handlePay}
        disabled={loading || !stripe}
      >
        {loading ? 'Processing...' : `Pay $${(total * 1.08).toFixed(2)} 🔒`}
      </button>
    </div>
  )
}

// ── Main Checkout ─────────────────────────────────────────
function Checkout() {
  const { items, total, clearCart } = useCart()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [ordered, setOrdered] = useState(false)
  const [orderNum] = useState(`TS${Math.floor(Math.random() * 90000 + 10000)}`)
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', zip: '', country: ''
  })

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSuccess = () => {
    clearCart()
    setOrdered(true)
  }

  if (items.length === 0 && !ordered) {
    return (
      <div className="checkout-empty">
        <span>🛒</span>
        <h2>Your cart is empty</h2>
        <Link to="/products" className="btn-primary">Shop Now</Link>
      </div>
    )
  }

  if (ordered) {
    return (
      <div className="order-success">
        <div className="success-card">
          <div className="success-icon">✓</div>
          <h2>Payment Successful!</h2>
          <p>Your order has been confirmed and will be shipped within 2-3 business days.</p>
          <div className="success-code">Order #{orderNum}</div>
          <Link to="/" className="btn-primary">Back to Home</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <h1>Check<span>out</span></h1>
        <p>Complete your purchase</p>
      </div>

      <div className="checkout-layout">

        {/* FORM */}
        <div className="checkout-form">

          {/* STEPS */}
          <div className="steps">
            <div className={`step ${step >= 1 ? 'active' : ''}`}>
              <span>1</span> Shipping
            </div>
            <div className="step-line"></div>
            <div className={`step ${step >= 2 ? 'active' : ''}`}>
              <span>2</span> Payment
            </div>
            <div className="step-line"></div>
            <div className={`step ${step >= 3 ? 'active' : ''}`}>
              <span>3</span> Review
            </div>
          </div>

          {/* STEP 1 - SHIPPING */}
          {step === 1 && (
            <div className="form-section">
              <h3>Shipping Information</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>First Name</label>
                  <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="Muhammad" />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Anas" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Email</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@email.com" />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input name="phone" value={form.phone} onChange={handleChange} placeholder="+92 300 0000000" />
                </div>
              </div>
              <div className="form-group full">
                <label>Address</label>
                <input name="address" value={form.address} onChange={handleChange} placeholder="Street address" />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>City</label>
                  <input name="city" value={form.city} onChange={handleChange} placeholder="Wah Cantt" />
                </div>
                <div className="form-group">
                  <label>ZIP Code</label>
                  <input name="zip" value={form.zip} onChange={handleChange} placeholder="47040" />
                </div>
              </div>
              <div className="form-group full">
                <label>Country</label>
                <select name="country" value={form.country} onChange={handleChange}>
                  <option value="">Select country</option>
                  <option value="PK">Pakistan</option>
                  <option value="US">United States</option>
                  <option value="UK">United Kingdom</option>
                  <option value="AE">UAE</option>
                </select>
              </div>
              <button className="next-btn" onClick={() => setStep(2)}>
                Continue to Payment →
              </button>
            </div>
          )}

          {/* STEP 2 - PAYMENT */}
          {step === 2 && (
            <div className="form-section">
              <h3>Payment Details</h3>
              <Elements stripe={stripePromise}>
                <PaymentForm total={total} form={form} items={items} onSuccess={handleSuccess} />
              </Elements>
              <button className="back-btn" style={{marginTop:'1rem'}} onClick={() => setStep(1)}>
                ← Back to Shipping
              </button>
            </div>
          )}

        </div>

        {/* ORDER SUMMARY */}
        <div className="checkout-summary">
          <h2>Order Summary</h2>
          <div className="checkout-items">
            {items.map(item => (
              <div key={item.id} className="checkout-item">
                <span className="checkout-item-img">{item.image}</span>
                <div className="checkout-item-info">
                  <p>{item.name}</p>
                  <small>x{item.qty}</small>
                </div>
                <strong>${(item.price * item.qty).toLocaleString()}</strong>
              </div>
            ))}
          </div>
          <div className="checkout-divider"></div>
          <div className="checkout-row">
            <span>Subtotal</span>
            <span>${total.toLocaleString()}</span>
          </div>
          <div className="checkout-row">
            <span>Shipping</span>
            <span className="free">Free</span>
          </div>
          <div className="checkout-row">
            <span>Tax (8%)</span>
            <span>${(total * 0.08).toFixed(2)}</span>
          </div>
          <div className="checkout-divider"></div>
          <div className="checkout-total">
            <span>Total</span>
            <strong>${(total * 1.08).toFixed(2)}</strong>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Checkout