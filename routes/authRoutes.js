const express = require('express');
const router = express.Router();
const {
  register,
  login,
  forgotPassword,
  resetPassword,
  verifyToken,
} = require('../controllers/authController');

// POST /api/auth/register
router.post('/register', register);

// POST /api/auth/login
router.post('/login', login);

// POST /api/auth/forgot-password
router.post('/forgot-password', forgotPassword);

// GET /api/auth/verify-token/:token
router.get('/verify-token/:token', verifyToken);

// POST /api/auth/reset-password/:token
router.post('/reset-password/:token', resetPassword);

// GET /api/auth/seed - Create test user
router.get('/seed', async (req, res) => {
  try {
    const User = require('../models/User');
    const crypto = require('crypto');
    const exists = await User.findOne({ email: 'test@test.com' });
    if (exists) {
      return res.json({ success: true, message: 'Test user already exists', email: 'test@test.com', password: 'test123' });
    }
    await User.create({
      username: 'testuser',
      email: 'test@test.com',
      password: crypto.createHash('sha256').update('test123').digest('hex'),
    });
    res.json({ success: true, message: 'Test user created!', email: 'test@test.com', password: 'test123' });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

module.exports = router;