const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");

const verifyToken = async (req, res, next) => {
  try {
    const token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];
    console.log("Extracted Token:", token); // Debugging statement

    if (!token) {
      return res.status(401).send("Unauthorized: No token provided");
    }

    const verifiedUser = jwt.verify(token, process.env.SECRET_KEY);
    console.log("Verified User:", verifiedUser); // Debugging statement

    const rootUser = await User.findOne({
      _id: verifiedUser._id,
      "tokens.token": token,
    });

    if (!rootUser) {
      throw new Error("User not found");
    }

    req.token = token;
    req.rootUser = rootUser;
    req.userId = rootUser._id;

    next();
  } catch (error) {
    res.status(401).send("Unauthorized: Invalid token");
    console.log("Token verification error:", error); // Debugging statement
  }
};

module.exports = verifyToken;
