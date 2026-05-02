// Import Product model so we can interact with products collection in MongoDB.
const Product = require('../models/Product');

// Import asyncHandler to automatically catch errors in async controller functions.
const asyncHandler = require('../Middleware/asyncHandler');

// CREATE PRODUCT
exports.createProduct = asyncHandler(async (req, res) => {
  const { name, price, stock } = req.body;

  const product = await Product.create({ name, price, stock });

  res.status(201).json({
    success: true,
    product
  });
});

exports.getAllProducts = asyncHandler(async (req, res) => {
  // Find all products from the products collection.
  const products = await Product.find();

  // Send all products as response.
  res.status(200).json({
    success: true,
    products
  });
});

// GET SINGLE PRODUCT
exports.getSingleProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  // If product exists, send it as response.
  res.status(200).json({
    success: true,
    product
  });
});


// UPDATE PRODUCT
exports.updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  );

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  // Send updated product.
  res.status(200).json({
    success: true,
    product
  });
});

// DELETE PRODUCT
exports.deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  // Send success response after deletion.
  res.status(200).json({
    success: true,
    message: 'Product deleted successfully'
  });
});