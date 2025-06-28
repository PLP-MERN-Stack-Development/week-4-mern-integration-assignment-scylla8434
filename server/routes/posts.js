// posts.js - Routes for blog posts

const express = require('express');
const { body, param } = require('express-validator');
const router = express.Router();
const Post = require('../models/Post');
const Category = require('../models/Category');
const auth = require('../middleware/auth');

// GET /api/posts - Get all blog posts (with pagination, search, filter)
router.get('/', async (req, res, next) => {
  try {
    const { page = 1, limit = 10, category, search } = req.query;
    const query = {};
    if (category) query.category = category;
    if (search) query.title = { $regex: search, $options: 'i' };
    const posts = await Post.find(query)
      .populate('author', 'username')
      .populate('category', 'name')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const total = await Post.countDocuments(query);
    res.json({ success: true, data: posts, total });
  } catch (err) {
    next(err);
  }
});

// GET /api/posts/:id - Get a specific blog post
router.get('/:id', async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'username')
      .populate('category', 'name');
    if (!post) return res.status(404).json({ success: false, error: 'Post not found' });
    res.json({ success: true, data: post });
  } catch (err) {
    next(err);
  }
});

// POST /api/posts - Create a new blog post
router.post(
  '/',
  auth,
  require('../middleware/upload').single('featuredImage'),
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('content').notEmpty().withMessage('Content is required'),
    body('category').notEmpty().withMessage('Category is required'),
  ],
  async (req, res, next) => {
    try {
      const errors = require('express-validator').validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });
      const { title, content, category, excerpt, tags } = req.body;
      const slug = title.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now();
      const featuredImage = req.file ? req.file.filename : undefined;
      const post = new Post({
        title,
        content,
        category,
        excerpt,
        tags,
        slug,
        featuredImage,
        author: req.user.id,
      });
      await post.save();
      res.status(201).json({ success: true, data: post });
    } catch (err) {
      next(err);
    }
  }
);

// PUT /api/posts/:id - Update an existing blog post
router.put(
  '/:id',
  auth,
  require('../middleware/upload').single('featuredImage'),
  [
    body('title').optional().notEmpty().withMessage('Title is required'),
    body('content').optional().notEmpty().withMessage('Content is required'),
    body('category').optional().notEmpty().withMessage('Category is required'),
  ],
  async (req, res, next) => {
    try {
      const errors = require('express-validator').validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });
      const update = { ...req.body };
      if (req.file) update.featuredImage = req.file.filename;
      const post = await Post.findByIdAndUpdate(req.params.id, update, { new: true });
      if (!post) return res.status(404).json({ success: false, error: 'Post not found' });
      res.json({ success: true, data: post });
    } catch (err) {
      next(err);
    }
  }
);

// DELETE /api/posts/:id - Delete a blog post
router.delete('/:id', auth, async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ success: false, error: 'Post not found' });
    res.json({ success: true, message: 'Post deleted' });
  } catch (err) {
    next(err);
  }
});

// POST /api/posts/:id/comments - Add a comment to a post
router.post(
  '/:id/comments',
  auth,
  [body('content').notEmpty().withMessage('Content is required')],
  async (req, res, next) => {
    try {
      const errors = require('express-validator').validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });
      const post = await Post.findById(req.params.id);
      if (!post) return res.status(404).json({ success: false, error: 'Post not found' });
      post.comments.push({ user: req.user.id, content: req.body.content, createdAt: new Date() });
      await post.save();
      res.status(201).json({ success: true, data: post.comments });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
