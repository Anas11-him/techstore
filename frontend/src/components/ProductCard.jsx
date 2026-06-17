import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import ProductIcon from "./ProductIcon";
import "./ProductCard.css";

export default function ProductCard({ product, delay = 0 }) {
  const { dispatch, items } = useCart();
  const { addToast } = useToast();
  const inCart = items.some((i) => i.id === product.id);

  const handleAdd = (e) => {
    e.preventDefault();
    dispatch({ type: "ADD", product });
    addToast(`${product.name} added to cart`);
  };

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <Link
      to={`/products/${product.id}`}
      className="product-card fade-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="card-image">
        <ProductIcon category={product.category} />
        {product.badge && (
          <span className={`badge ${product.badge === "Sale" ? "badge-red" : product.badge === "New" ? "badge-teal" : "badge-gold"}`}>
            {product.badge}
          </span>
        )}
        {discount > 0 && <span className="discount-tag">-{discount}%</span>}
      </div>

      <div className="card-body">
        <div className="card-category">{product.category}</div>
        <h3 className="card-name">{product.name}</h3>

        <div className="card-rating">
          <span className="stars">{"★".repeat(Math.floor(product.rating))}</span>
          <span className="rating-num">{product.rating}</span>
          <span className="reviews">({product.reviews.toLocaleString()})</span>
        </div>

        <div className="card-footer">
          <div className="card-prices">
            <span className="price">${product.price.toLocaleString()}</span>
            <span className="original-price">${product.originalPrice.toLocaleString()}</span>
          </div>
          <button
            className={`add-btn ${inCart ? "in-cart" : ""}`}
            onClick={handleAdd}
          >
            {inCart ? "✓" : "+"}
          </button>
        </div>
      </div>
    </Link>
  );
}