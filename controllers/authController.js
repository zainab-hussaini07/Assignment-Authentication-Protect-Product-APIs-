const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const asyncHandler = require('../Middleware/asyncHandler');


const generateToken = (id) => {
  return jwt.sign(
    { id: id },                 
    process.env.JWT_SECRET,     // Secret key from .env.
    { expiresIn: process.env.JWT_EXPIRE } // Token expiry time.
  );
};


// REGISTER USER
exports.registerUser = asyncHandler(async (req, res) => {
  // Get name, email, and password from Postman body.
  const { name, email, password } = req.body;

  // Check if user already exists with same email.
  const userExists = await User.findOne({ email: email });

  // If user exists, throw error.
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Create new user.
  // Password will be hashed automatically in User.js pre-save middleware.
  const user = await User.create({
    name,
    email,
    password
  });

  // Send response with user data and token.
  res.status(201).json({
    success: true,
    user: {
      id: user._id,
      name: user.name,
      email: user.email
    },
    token: generateToken(user._id)
  });
});


// LOGIN USER
exports.loginUser = asyncHandler(async (req, res) => {
  // Get email and password from Postman body.
  const { email, password } = req.body;

  // Find user by email.
  const user = await User.findOne({ email: email });

  // If user does not exist, throw error.
  if (!user) {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  // Compare entered password with hashed password stored in DB.
  const isMatch = await bcrypt.compare(password, user.password);

  // If password does not match, throw error.
  if (!isMatch) {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  // If login is successful, send user data and token.
  res.status(200).json({
    success: true,
    user: {
      id: user._id,
      name: user.name,
      email: user.email
    },
    token: generateToken(user._id)
  });
});