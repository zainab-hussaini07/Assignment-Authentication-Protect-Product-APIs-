// Import express package.
const express = require('express');

// Create router object.
const router = express.Router();

// Import auth controller functions.
const authController = require('../controllers/authController');

// Import protect middleware.
const { protect } = require('../Middleware/authMiddleware');


// Register route.
// Public route.
router.post('/register', authController.registerUser);


// Login route.
// Public route.
router.post('/login', authController.loginUser);


// Test protected route.
// Only logged-in users with valid token can access this.
router.get('/profile', protect, (req, res) => {
  res.status(200).json({
    success: true,
    message: 'You are authorized',
    user: req.user
  });
});


// Export router so app.js can use it.
module.exports = router;