const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  work: { type: String, required: true },
  password: { type: String, required: true },
  cpassword: { type: String, required: true },
  date: { type: Date, default: Date.now },
  messages: [
    {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: Number, required: true },
      message: { type: String, required: true },
    },
  ],
  tokens: [
    {
      token: { type: String, required: true },
    },
  ],
});


const hashPassword = async (user) => {
  if (user.isModified("password")) {
    const hashedPassword = await bcrypt.hash(user.password, 12);
    user.password = hashedPassword;
    user.cpassword = hashedPassword;
  }
};


userSchema.pre("save", async function (next) {
  await hashPassword(this);
  next();
});


const generateAuthToken = async (user) => {
  try {
    let token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
    user.tokens = user.tokens.concat({ token: token });
    await user.save();
    return token;
  } catch (error) {
    console.log(error);
  }
};


const addMessage = async (user, name, email, phone, message) => {
  try {
    user.messages = user.messages.concat({ name, email, phone, message });
    await user.save();
    return user.messages;
  } catch (error) {
    console.log(error);
  }
};


const User = mongoose.model("users", userSchema);

module.exports = {
  User,
  generateAuthToken,
  addMessage,
};
