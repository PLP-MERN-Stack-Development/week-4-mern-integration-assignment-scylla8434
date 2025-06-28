// categories.js - Routes for blog categories

const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const Category = require('../models/Category');
const auth = require('../middleware/auth');

// GET /api/categories - Get all categories
router.get('/', async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.json({ success: true, data: categories });
  } catch (err) {
    next(err);
  }
});

// POST /api/categories - Create a new category
router.post(
  '/',
  require('../middleware/auth'),
  [body('name').notEmpty().withMessage('Name is required')],
  async (req, res, next) => {
    try {
      const errors = require('express-validator').validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });
      const { name, description } = req.body;
      const category = new Category({ name, description });
      await category.save();
      res.status(201).json({ success: true, data: category });
    } catch (err) {
      if (err.code === 11000) {
        return res.status(400).json({ success: false, error: 'Category already exists' });
      }
      next(err);
    }
  }
);

module.exports = router;
