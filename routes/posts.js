const express = require("express");
const router = express.Router();
// Import posts controller
const { createPost, updatePost, getPosts } = require("../controllers/posts");
const upload = require("../utils/multer");

// Route to create a new post
router.post("/", upload.single("image"), createPost);
// Route to get all posts
router.get("/", getPosts);
// Route to update a post
router.put("/:id", upload.single("image"), updatePost);

module.exports = router;
