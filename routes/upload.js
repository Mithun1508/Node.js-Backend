const express = require("express");
const router = express.Router();
const users = require("../controllers/upload");

// Upload User
router.post("/", users.upload);

module.exports = router;