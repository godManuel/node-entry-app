const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      maxlength: [255, "Title is more than 255 characters"],
      required: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: [5000, "Description is more than 5000 characters"],
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
