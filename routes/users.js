const express = require("express");
const router = express.Router();
const users = require("../controllers/users");

// Create User
router.post("/", users.create);

// Login User
router.post("/login", users.login);

// Read users
router.get("/:userId?", users.find);

// Delete User
router.delete("/:userId", users.remove);

module.exports = router;