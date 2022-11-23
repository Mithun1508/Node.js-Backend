const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  img: String,
  userId: String,
  password: String,
  info: String,
});

const User = mongoose.model("User", userSchema);
module.exports = User;