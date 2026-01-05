const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Book = require("./models/book");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root route (important for Render test)
app.get("/", (req, res) => {
  res.send("Library Backend Running");
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));



// CREATE
app.post("/books", async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ
app.get("/books", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
app.put("/books/:id", async (req, res) => {
  try {
    const updated = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE
app.delete("/books/:id", async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: "Book deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
