// auth.js - Routes for user authentication

const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

// POST /api/auth/register - Register a new user
router.post(
  '/register',
  [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });
      const { username, email, password } = req.body;
      let user = await User.findOne({ email });
      if (user) return res.status(400).json({ success: false, error: 'Email already registered' });
      user = new User({ username, email, password });
      await user.save();
      const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '7d' });
      res.status(201).json({ success: true, token, user: { id: user._id, username: user.username, email: user.email } });
    } catch (err) {
      next(err);
    }
  }
);

// POST /api/auth/login - Login user
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ success: false, error: 'Invalid credentials' });
      const isMatch = await user.comparePassword(password);
      if (!isMatch) return res.status(400).json({ success: false, error: 'Invalid credentials' });
      const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '7d' });
      res.json({ success: true, token, user: { id: user._id, username: user.username, email: user.email } });
    } catch (err) {
      next(err);
    }
  }
);

// GET /api/auth/me - Get current user (protected)
router.get('/me', require('../middleware/auth'), async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json({ success: true, user });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
