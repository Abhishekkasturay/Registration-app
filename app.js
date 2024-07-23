const express = require("express");
const dotenv = require("dotenv");
const path = require("path");

// Load environment variables from .env file
dotenv.config(); // No need to specify path if the file is named .env

const app = express();
const PORT = process.env.PORT || 5000;

// Debug logs to check environment variables
console.log("Database URL:", process.env.DATABASE);
console.log("Port:", process.env.PORT);

// Connect to MongoDB
require("./db/connection");

app.use(express.json());
app.use(require("./router/auth"));

app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is Running on port number ${PORT}`);
});
