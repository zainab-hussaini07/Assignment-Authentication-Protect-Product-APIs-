const notFound = (req, res, next) => {

  const error = new Error(`Route not found - ${req.originalUrl}`);

  res.status(404);
  next(error);
};


const errorHandler = (err, req, res, next) => {

  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  // Store the error message.
  let message = err.message;

  if (err.name === 'CastError') {
    statusCode = 404;
    message = 'Invalid product ID';
  }

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

module.exports = {
  notFound,
  errorHandler
};