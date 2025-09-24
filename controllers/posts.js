const Post = require("../models/Post");
const path = require("path");

const createPost = async (req, res) => {
  try {
    const filePath = `/uploads/${req.file.filename}`;
    const absolutePath = path.join(
      __dirname,
      "..",
      "uploads",
      req.file.filename
    );

    const post = await Post.create({
      title: req.body.title,
      description: req.body.description,
      image: filePath,
    });

    res.status(201).json({ message: "Post created", data: post });

    //   res.json({ message: "Post created", data: post });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log(error);
  }
};

const getPosts = async (req, res) => {
  const posts = await Post.find();
  res.json({ posts });
};

const updatePost = async (req, res) => {
  try {
    const filePath = `/uploads/${req.file.filename}`;
    const absolutePath = path.join(
      __dirname,
      "..",
      "uploads",
      req.file.filename
    );

    let post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
          image: filePath,
        },
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({ message: "Post updated", data: post });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log(error);
  }
};

exports.createPost = createPost;
exports.getPosts = getPosts;
exports.updatePost = updatePost;
