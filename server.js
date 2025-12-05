import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Inventory from "./models/Inventory.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  return res.json({ message: "Inventory API is running" });
});

// READ: GET /api/inventory
app.get("/api/inventory", async (req, res) => {
  try {
    const items = await Inventory.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: items });
  } catch (error) {
    console.error("GET /api/inventory error:", error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
      details: error.message
    });
  }
});

// CREATE: POST /api/inventory
app.post("/api/inventory", async (req, res) => {
  try {
    const { name, description, quantity, status } = req.body;

    if (!name || !description) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields: name, description"
      });
    }

    const newItem = await Inventory.create({ name, description, quantity, status });
    return res.status(201).json({ success: true, data: newItem });
  } catch (error) {
    console.error("POST /api/inventory error:", error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
      details: error.message
    });
  }
});

// UPDATE: PUT /api/inventory/:id
app.put("/api/inventory/:id", async (req, res) => {
  try {
    const updated = await Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.status(200).json({ success: true, data: updated });
  } catch (error) {
    console.error("PUT /api/inventory/:id error:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

// DELETE: DELETE /api/inventory/:id
app.delete("/api/inventory/:id", async (req, res) => {
  try {
    await Inventory.findByIdAndDelete(req.params.id);
    return res.status(200).json({ success: true, message: "Item deleted" });
  } catch (error) {
    console.error("DELETE /api/inventory/:id error:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

// DB connection + server start
const PORT = 4000;
const MONGO_URI =
  "mongodb+srv://hannah_db_user:hontiveros@inventory.gx8s9pn.mongodb.net/inventory?retryWrites=true&w=majority";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Database Connected");
    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err);
    process.exit(1);
  });
