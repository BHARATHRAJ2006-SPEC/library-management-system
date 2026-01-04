const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Book = require("./models/Book-");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connect
mongoose.connect("mongodb+srv://bharathbharath84528_db_user:mt2JcdtNYOk14Od7@cluster0.kxvnkoy.mongodb.net/?appName=Cluster0")
.then(()=>console.log("MongoDB connected"))
.catch(err=>console.log(err));

// CREATE
app.post("/books", async (req,res)=>{
  const book = await Book.create(req.body);
  res.json(book);
});

// READ
app.get("/books", async (req,res)=>{
  const books = await Book.find();
  res.json(books);
});

// DELETE
app.delete("/books/:id", async (req,res)=>{
  await Book.findByIdAndDelete(req.params.id);
  res.json({message:"Deleted"});
});

// UPDATE
app.put("/books/:id", async (req,res)=>{
  const book = await Book.findByIdAndUpdate(req.params.id, req.body);
  res.json(book);
});

app.listen(5000, ()=>{
  console.log("Server running on port 5000");
});
