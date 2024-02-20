const express = require("express");
const dotenv = require("dotenv");
const { data } = require("./data/data");
const connectDB = require("./config/db");

dotenv.config(); // Load environment variables before calling connectDB()

connectDB(); // Call connectDB() after loading environment variables

const app = express();

app.get("/", (req, res) => {
  res.send("API is Running Successfully");
});

app.get("/api/data", (req, res) => {
  res.send(data);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started running on PORT ${PORT}`)); // Fix the console.log statement
