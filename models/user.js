// Import mongoose to create a user schema and model.
const mongoose = require('mongoose');

// Import bcryptjs to hash passwords before saving them.
const bcrypt = require('bcryptjs');

// Create user schema.
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },

  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true
  },

  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  }
});

// This middleware runs before saving user.
// It hashes the password before storing it in MongoDB.
userSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Export User model.
module.exports = mongoose.model('User', userSchema);