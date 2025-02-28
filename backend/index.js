const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const products = [
  { id: 1, name: "Laptop", description: "High-performance laptop", price: 1200, image: "https://via.placeholder.com/150" },
  { id: 2, name: "Phone", description: "Latest smartphone", price: 800, image: "https://via.placeholder.com/150" },
  { id: 3, name: "Headphones", description: "Noise-canceling headphones", price: 200, image: "https://via.placeholder.com/150" }
];

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.post("/api/order", (req, res) => {
  const { firstName, lastName, address, cart } = req.body;

  if (!firstName || !lastName || !address || !cart.length) {
    return res.status(400).json({ message: "All fields are required and cart cannot be empty." });
  }

  console.log("Order Placed:", { firstName, lastName, address, cart });
  res.json({ message: "Order placed successfully!" });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
