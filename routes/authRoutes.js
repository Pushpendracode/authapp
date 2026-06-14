const express = require('express');
const router = express.Router();
const { register, login, getProfile } = require('../controllers/authController');
const protect = require('../middleware/authMiddleware');

// POST /api/auth/register
router.post('/register', register);

// POST /api/auth/login
router.post('/login', login);

// GET /api/auth/profile (protected)
router.get('/profile', protect, getProfile);

// GET /api/auth/test - Get a valid test token
router.get('/test', async (req, res) => {
  try {
    const User = require('../models/User');
    const jwt = require('jsonwebtoken');
    const crypto = require('crypto');

    // Find or create test user
    let user = await User.findOne({ email: 'test@test.com' });
    if (!user) {
      user = await User.create({
        username: 'testuser',
        email: 'test@test.com',
        password: crypto.createHash('sha256').update('test123').digest('hex'),
      });
    }

    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    res.json({
      success: true,
      message: 'Use this token in Authorization header as: Bearer <token>',
      token,
      usage: {
        header: 'Authorization',
        value: `Bearer ${token}`,
        endpoint: 'GET /api/auth/profile',
      },
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

module.exports = router;