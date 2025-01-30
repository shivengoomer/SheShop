import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Simple User Schema with Role
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['Buyer', 'Seller'], default: 'Buyer' }, // Default role is 'Buyer'
});
const User = mongoose.model("User", userSchema);

// Simple Product Schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the seller
});
const Product = mongoose.model("Product", productSchema);

// Routes
app.get("/", (req, res) => {
  res.send("SheShop API is running...");
});

// Add User (Signup)
app.post("/users/signup", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Create a new user with role
    const user = new User({ name, email, password, role });
    await user.save();

    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// User Login Route (Without JWT)
app.post("/users/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // Check if password matches
    if (user.password !== password) {
      return res.status(400).json({ error: "Incorrect password" });
    }

    // Return a simple success message along with the user's role
    res.json({ message: "Login successful", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Add Product
app.post('/products', async (req, res) => {
  const { name, price, description, imageUrl, sellerId } = req.body;

  try {
    // Create a new product
    const newProduct = new Product({
      name,
      price,
      description,
      imageUrl,
      sellerId,
    });

    // Save product to DB
    await newProduct.save();

    // Send success response
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ error: "Failed to add product" });
  }
});

// Get Products by Seller
app.get('/products', async (req, res) => {
  const { seller } = req.query;

  try {
    // Fetch products for the seller
    const products = await Product.find({ sellerId: seller });
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

app.use(express.json()); // For parsing application/json
app.use(cors());

const PORT = process.env.PORT || 5530;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
