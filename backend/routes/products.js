const express = require("express");
const router = express.Router();
const products = require("../data/products");

// GET all products with optional filters
router.get("/", (req, res) => {
  let result = [...products];
  const { category, search, sort, minPrice, maxPrice } = req.query;

  if (category && category !== "All") {
    result = result.filter((p) => p.category === category);
  }
  if (search) {
    const q = search.toLowerCase();
    result = result.filter(
      (p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
    );
  }
  if (minPrice) result = result.filter((p) => p.price >= Number(minPrice));
  if (maxPrice) result = result.filter((p) => p.price <= Number(maxPrice));

  if (sort === "price-asc") result.sort((a, b) => a.price - b.price);
  else if (sort === "price-desc") result.sort((a, b) => b.price - a.price);
  else if (sort === "rating") result.sort((a, b) => b.rating - a.rating);
  else if (sort === "reviews") result.sort((a, b) => b.reviews - a.reviews);

  res.json({ success: true, count: result.length, data: result });
});

// GET single product
router.get("/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ success: false, message: "Product not found" });
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
  res.json({ success: true, data: product, related });
});

// GET categories
router.get("/meta/categories", (req, res) => {
  const categories = ["All", ...new Set(products.map((p) => p.category))];
  res.json({ success: true, data: categories });
});

// POST checkout
router.post("/checkout/order", (req, res) => {
  const { items, customer } = req.body;
  if (!items || !items.length)
    return res.status(400).json({ success: false, message: "No items" });

  const orderId = "ORD-" + Date.now().toString(36).toUpperCase();
  const total = items.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.id);
    return sum + (product ? product.price * item.qty : 0);
  }, 0);

  res.json({
    success: true,
    data: {
      orderId,
      total,
      estimatedDelivery: "3–5 business days",
      message: "Order placed successfully!",
      customer,
    },
  });
});

module.exports = router;