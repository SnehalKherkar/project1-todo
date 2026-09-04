const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./config/db");
const todoRoutes = require("./routes/todoRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// pool.connect()
//   .then(() => console.log("Database connected successfully 🚀"))
//   .catch((err) => console.error("Database connection error:", err));

pool.query("SELECT NOW()")
  .then(() => console.log("Database connected successfully 🚀"))
  .catch((err) => console.error("Database connection error:", err));

app.get("/", (req, res) => {
  res.json({
    message: "Todo API is running successfully 🚀",
  });
});

app.use("/api/todos", todoRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});