import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import './Cart.css'

function Cart() {
  const { items, removeFromCart, updateQty, total, count } = useCart()

  if (items.length === 0) {
    return (
      <div className="cart-empty">
        <span>🛒</span>
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added anything yet.</p>
        <Link to="/products" className="btn-primary">Start Shopping</Link>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1>Your <span>Cart</span></h1>
        <p>{count} item{count > 1 ? 's' : ''} in your cart</p>
      </div>

      <div className="cart-layout">

        {/* ITEMS */}
        <div className="cart-items">
          {items.map(item => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-img">{item.image}</div>
              <div className="cart-item-info">
                <span className="cart-item-cat">{item.category}</span>
                <h3>{item.name}</h3>
                <p className="cart-item-price">${item.price} each</p>
              </div>
              <div className="cart-item-controls">
                <div className="qty-control">
                  <button onClick={() => updateQty(item.id, item.qty - 1)}>−</button>
                  <span>{item.qty}</span>
                  <button onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                </div>
                <p className="cart-item-subtotal">${(item.price * item.qty).toLocaleString()}</p>
                <button className="remove-btn" onClick={() => removeFromCart(item.id)}>✕</button>
              </div>
            </div>
          ))}
        </div>

        {/* SUMMARY */}
        <div className="cart-summary">
          <h2>Order Summary</h2>

          <div className="summary-rows">
            {items.map(item => (
              <div key={item.id} className="summary-row">
                <span>{item.name} x{item.qty}</span>
                <span>${(item.price * item.qty).toLocaleString()}</span>
              </div>
            ))}
          </div>

          <div className="summary-divider"></div>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>${total.toLocaleString()}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span className="free">Free</span>
          </div>
          <div className="summary-row">
            <span>Tax (8%)</span>
            <span>${(total * 0.08).toFixed(2)}</span>
          </div>

          <div className="summary-divider"></div>

          <div className="summary-total">
            <span>Total</span>
            <strong>${(total * 1.08).toFixed(2)}</strong>
          </div>

          <Link to="/checkout" className="checkout-btn">
            Proceed to Checkout →
          </Link>

          <Link to="/products" className="continue-btn">
            ← Continue Shopping
          </Link>
        </div>

      </div>
    </div>
  )
}

export default Cart