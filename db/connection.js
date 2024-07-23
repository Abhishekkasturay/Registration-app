const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

// Debug log to check if environment variable is being loaded
console.log("Database URL:", process.env.DATABASE);

const dbUrl = process.env.DATABASE;

if (!dbUrl) {
  console.error("DATABASE environment variable is not set.");
  process.exit(1); // Exit the application
}

// Handle strictQuery deprecation warning
mongoose.set("strictQuery", true);

mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((err) => {
    console.error("Connection error", err);
  });
