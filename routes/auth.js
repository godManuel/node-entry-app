// Require express package
const express = require("express");
const router = express.Router();

// Import auth controllers
const { login } = require("../controllers/auth");


// Setup auth routes
router.post("/login", login);

module.exports = router;
