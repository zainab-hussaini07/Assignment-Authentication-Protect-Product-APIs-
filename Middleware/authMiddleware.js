const jwt = require('jsonwebtoken');
const User = require('../models/User');
const asyncHandler = require('./asyncHandler');
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
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