// This middleware runs when the user enters a route that does not exist.
const notFound = (req, res, next) => {

  // Create a new error object with the wrong URL.
  const error = new Error(`Route not found - ${req.originalUrl}`);

  // Set response status code to 404 because route was not found.
  res.status(404);

  // Pass this error to the next error-handling middleware.
  next(error);
};


// This is the main/global error handler.
// Notice it has 4 parameters: err, req, res, next.
// Express knows this is an error handler because it has 4 parameters.
const errorHandler = (err, req, res, next) => {

  // If status code is still 200, that means no error status was set manually.
  // So we change it to 500, meaning server error.
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  // Store the error message.
  let message = err.message;

  // This handles invalid MongoDB IDs.
  // Example: /api/products/123
  // MongoDB expects a valid ObjectId, so "123" causes CastError.
  if (err.name === 'CastError') {
    statusCode = 404;
    message = 'Invalid product ID';
  }

  // This handles Mongoose validation errors.
  // Example: required field missing from request body.
  if (err.name === 'ValidationError') {
    statusCode = 400;

    // Convert all validation error messages into one string.
    message = Object.values(err.errors)
      .map((value) => value.message)
      .join(', ');
  }

  // Send final error response to Postman.
  res.status(statusCode).json({
    success: false,
    message: message
  });
};


// Export both middleware functions.
module.exports = {
  notFound,
  errorHandler
};