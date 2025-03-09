const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb'); // ✅ Imported ObjectId
require('dotenv').config();

const app = express();
const port = process.env.PORT || 6001;

// Middleware
app.use(cors());
app.use(express.json());

// Debugging Environment Variables
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD ? "********" : "Not Set");

// MongoDB Connection URI
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@demo-foodi-cluster.d4g8c.mongodb.net/demo-foodi-client?retryWrites=true&w=majority&tls=true`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  tls: true,
  connectTimeoutMS: 10000, // 10 seconds timeout
  serverSelectionTimeoutMS: 5000, // 5 seconds for initial connection
});

async function run() {
  try {
    console.log("⏳ Connecting to MongoDB...");
    await client.connect();
    console.log("✅ Connected to MongoDB!");

    const menuCollections = client.db("demo-foodi-client").collection("menus");
    const cartCollections = client.db("demo-foodi-client").collection("cartItems");

    // ✅ Get all menu items
    app.get('/menu', async (req, res) => {
      try {
        const result = await menuCollections.find().toArray();
        res.send(result);
      } catch (error) {
        console.error("❌ Error fetching menu:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    });

    // ✅ Add item to cart
    app.post('/carts', async (req, res) => {
      try {
        const cartItem = req.body;
        const result = await cartCollections.insertOne(cartItem);
        res.send(result);
      } catch (error) {
        console.error("❌ Error adding to cart:", error);
        res.status(500).json({ message: "Server error" });
      }
    });

    // ✅ Get cart items by email
    app.get('/carts', async (req, res) => {
      try {
        const email = req.query.email;
        const filter = { email };
        const result = await cartCollections.find(filter).toArray();
        res.send(result);
      } catch (error) {
        console.error("❌ Error fetching cart items:", error);
        res.status(500).json({ message: "Server error" });
      }
    });

    // ✅ Delete item from cart
    app.delete('/carts/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        const result = await cartCollections.deleteOne(filter);
        res.send(result);
      } catch (error) {
        console.error("❌ Error deleting cart item:", error);
        res.status(500).json({ message: "Server error" });
      }
    });

    // ✅ Get specific cart item by ID
    app.get('/carts/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        const result = await cartCollections.findOne(filter);
        res.send(result);
      } catch (error) {
        console.error("❌ Error fetching cart item:", error);
        res.status(500).json({ message: "Server error" });
      }
    });

    // ✅ Update item quantity in cart
    app.put('/carts/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const { quantity } = req.body;

        if (!quantity || quantity < 1) {
          return res.status(400).json({ message: "Invalid quantity" });
        }

        const filter = { _id: new ObjectId(id) };
        const updateDoc = { $set: { quantity } };
        const result = await cartCollections.updateOne(filter, updateDoc);

        if (result.matchedCount === 0) {
          return res.status(404).json({ message: "Cart item not found" });
        }

        res.json({ message: "Quantity updated successfully", result });
      } catch (error) {
        console.error("❌ Error updating cart item:", error);
        res.status(500).json({ message: "Server error" });
      }
    });

    // ✅ Ping MongoDB to verify connection
    await client.db("admin").command({ ping: 1 });
    console.log("✅ MongoDB Ping Success!");

  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
  }
}
run();

// ✅ Root Route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// ✅ Start Server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
