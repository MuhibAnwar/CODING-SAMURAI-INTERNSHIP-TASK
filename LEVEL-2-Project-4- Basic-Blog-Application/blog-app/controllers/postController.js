const Post = require('../models/Post');

// Get all posts
exports.getAllPosts = async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
};

// Get single post
exports.getPostById = async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.json(post);
};

// Create new post
exports.createPost = async (req, res) => {
  const newPost = new Post(req.body);
  await newPost.save();
  res.status(201).json(newPost);
};

// Update post
exports.updatePost = async (req, res) => {
  const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedPost);
};

// Delete post
exports.deletePost = async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.json({ message: 'Post deleted' });
};
