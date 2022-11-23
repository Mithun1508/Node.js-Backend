const User = require("../models/User");

// Create User
module.exports.create = async (req, res) => {
  try {
    const { userId, password, info } = req.body;
    const user = new User({ userId, password, info });
    await user.save();
    return res.send(user);
  } catch (err) {
    return res.status(500).send(err);
  }
};

// Login User
module.exports.login = async (req, res) => {
  try {
    const { userId, password } = req.body;
    const user = await User.findOne({ userId: userId, password: password });
    if (!user) {
      return res.status(404).send("user not found");
    }
    return res.send(user);
  } catch (err) {
    return res.status(500).send(err);
  }
};

// Read users
module.exports.find = async (req, res) => {
  try {
    const { userId } = req.params;

    if (userId) {
      const user = await User.findOne({ userId });
      if (!user) {
        return res.status(404).send("user not found");
      }
      return res.send(user);
    }
    const users = await User.find({});
    return res.send(users);
  } catch (err) {
    return res.status(500).send(err);
  }
};

// Delete User
module.exports.remove = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({ userId });
    if (!user) return res.status(404).send("user not found");

    await user.remove();
    return res.send();
  } catch (err) {
    return res.status(500).send(err);
  }
};