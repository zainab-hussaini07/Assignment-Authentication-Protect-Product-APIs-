// Load environment variables from .env file into process.env.
require('dotenv').config();
// Import express package.
const express = require('express');
//imoprt MongoDB connection function from config folder
const connectDB = require('./config/db');

// Import product routes from routes folder.
const productRoutes = require('./routes/productroutes');

// Import auth routes.
const authRoutes = require('./routes/authRoutes');

//import custome error middleware
const { notFound, errorHandler } = require('./Middleware/errorMiddleware');

// Create express application.
const app = express();

// middleware
app.use(express.json());

// connect database
connectDB();

// Use product routes.
// All product APIs will start with /api.
app.use('/api', productRoutes);

// Use auth routes.
// Final URLs start with /api/auth.
app.use('/api/auth', authRoutes);

// If request reaches here, it means no route matched.
// So this middleware creates a 404 error.// Example: /api/abc
app.use(notFound);

// This middleware catches and responds to all errors.// This middleware handles all errors from controllers and routes.
app.use(errorHandler);

// Start server on port 3000.
// app.listen(3000, () => {
//   console.log('Server running on port 3000');
// });
// Get port from .env file.
// If PORT does not exist, use 3000 as backup.
const PORT = process.env.PORT || 3000;

// Start the server using PORT variable.
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});