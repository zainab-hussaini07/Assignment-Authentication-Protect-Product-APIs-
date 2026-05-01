// Import jsonwebtoken to verify token.
const jwt = require('jsonwebtoken');

// Import User model to find logged-in user.
const User = require('../models/User');

// Import asyncHandler to handle async errors.
const asyncHandler = require('./asyncHandler');


// This middleware protects private routes.
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check if authorization header exists and starts with Bearer.
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Get token from header.
    // Header format: Bearer tokenHere
    token = req.headers.authorization.split(' ')[1];

    // Verify token.
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user by id from token.
    // Remove password from returned user data.
    req.user = await User.findById(decoded.id).select('-password');

    // Continue to next controller.
    next();
  }

  // If token does not exist.
  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

module.exports = { protect };