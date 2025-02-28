const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
app.use(cors());
app.use(bodyParser.json());
const products = require("./products")



app.get("/api/products", (req, res) => {
  res.json(products);
});

app.post("/api/order", (req, res) => {
  const { firstName, lastName, address, cart } = req.body;
    console.log("placing order... ", { firstName, lastName, address, cart });
    
  if (!firstName || !lastName || !address || !cart.length) {
    return res.status(400).json({ message: "All fields are required and cart cannot be empty." });
  }

  console.log("Order Placed:", { firstName, lastName, address, cart });
  res.json({ message: "Order placed successfully!" });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
