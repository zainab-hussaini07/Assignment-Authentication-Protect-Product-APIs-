// This function receives another function as input.
// That input function will usually be a controller function.
const asyncHandler = (fn) => {

  // This returns a new middleware function.
  // Express middleware always has req, res, and next.
  return (req, res, next) => {

    // Promise.resolve runs the controller function.
    // If the controller gives an error, .catch(next) sends that error to Express error handler.
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// Export asyncHandler so we can use it inside productController.js.
module.exports = asyncHandler;
