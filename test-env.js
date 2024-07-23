const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

console.log("DATABASE:", process.env.DATABASE);
console.log("PORT:", process.env.PORT);
console.log("SECRET_KEY:", process.env.SECRET_KEY);
