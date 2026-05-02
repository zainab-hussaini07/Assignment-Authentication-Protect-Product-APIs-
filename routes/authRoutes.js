const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

const { protect } = require('../Middleware/authMiddleware');

router.post('/register', authController.registerUser);

router.post('/login', authController.loginUser);

router.get('/profile', protect, (req, res) => {
  res.status(200).json({
    success: true,
    message: 'You are authorized',
    user: req.user
  });
});


module.exports = router;