import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Simple User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});
const User = mongoose.model("User", userSchema);

// Simple Product Schema
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  description: String,
  image: String,
});
const Product = mongoose.model("Product", productSchema);

// Routes
app.get("/", (req, res) => {
  res.send("SheShop API is running...");
});

// Add User (Signup)
app.post("/users/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Create a new user
    const user = new User({ name, email, password });
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

    // Return a simple success message instead of JWT
    res.json({ message: "Login successful", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Add Product
app.post("/products", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5530;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
