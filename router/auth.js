const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { User, generateAuthToken, addMessage } = require("../model/userSchema");
const verifyToken = require("../middleware/verifyToken");

// Using Async-Await for registration
router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;

  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res
      .status(422)
      .json({ error: "Please fill all the fields properly" });
  }

  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ error: "Email already exists" });
    } else if (password !== cpassword) {
      return res.status(422).json({ error: "Passwords do not match" });
    } else {
      const user = new User({ name, email, phone, work, password, cpassword });
      await user.save();
      return res.status(201).json({ message: "User registered successfully" });
    }
  } catch (error) {
    console.log(error);
  }
});

// Login Route
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Please fill in all the fields" });
    }

    const userLogin = await User.findOne({ email: email });

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      if (isMatch) {
        const token = await generateAuthToken(userLogin); 
        res.json({ message: "User signed in successfully", jwtToken: token });
      } else {
        res.status(400).json({ message: "Invalid credentials" });
      }
    } else {
      res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
  }
});

// About Page Route
router.get("/about", verifyToken, (req, res) => {
  res.send(req.rootUser);
});

// Get Data For Contact And Home Page
router.get("/getdata", verifyToken, (req, res) => {
  res.send(req.rootUser);
});

// Contact Page
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { User, generateAuthToken, addMessage } = require("../model/userSchema");
const verifyToken = require("../middleware/verifyToken");

// Using Async-Await for registration
router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;

  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res
      .status(422)
      .json({ error: "Please fill all the fields properly" });
  }

  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ error: "Email already exists" });
    } else if (password !== cpassword) {
      return res.status(422).json({ error: "Passwords do not match" });
    } else {
      const user = new User({ name, email, phone, work, password, cpassword });
      await user.save();
      return res.status(201).json({ message: "User registered successfully" });
    }
  } catch (error) {
    console.log(error);
  }
});

// Login Route
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Please fill in all the fields" });
    }

    const userLogin = await User.findOne({ email: email });

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      if (isMatch) {
        const token = await generateAuthToken(userLogin); 
        res.json({ message: "User signed in successfully", jwtToken: token });
      } else {
        res.status(400).json({ message: "Invalid credentials" });
      }
    } else {
      res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
  }
});

// About Page Route
router.get("/about", verifyToken, (req, res) => {
  res.send(req.rootUser);
});

// Get Data For Contact And Home Page
router.get("/getdata", verifyToken, (req, res) => {
  res.send(req.rootUser);
});

// Contact Page
router.post("/contact", verifyToken, async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({ error: "Please fill in all fields" });
    }

    // Prepare email data
    const emailData = {
      service_id: "service_ytb2fmo", 
      template_id: "template_knukl5h", 
      user_id: "04wKDri_UyNpvP-Yi", 
     template_params: {
    to_name: "Abhishek kasturay",
    from_name: name,
    message: message,
    reply_to: email,
  },
    };

    // Send email using Fetch API
    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(emailData),
    });

    if (!response.ok) {
      throw new Error("Failed to send email");
    }

    res.status(200).json({ message: "Message sent successfully" });

  } catch (error) {
    console.error("Error in /contact route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// Logout Page
router.get("/logout", (req, res) => {
  res.status(200).send({ message: "User logged out" });
});

module.exports = router;


// Logout Page
router.get("/logout", (req, res) => {
  res.status(200).send({ message: "User logged out" });
});

module.exports = router;
