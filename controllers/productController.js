// Import Product model so we can interact with products collection in MongoDB.
const Product = require('../models/Product');

// Import asyncHandler to automatically catch errors in async controller functions.
const asyncHandler = require('../Middleware/asyncHandler');

// CREATE PRODUCT
// exports.createProduct = async (req, res) => {
//   try {
//     const { name, price, stock } = req.body;

//     const product = await Product.create({ name, price, stock });

//     res.status(201).json({
//       success: true,
//       product
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };
// CREATE PRODUCT
exports.createProduct = asyncHandler(async (req, res) => {
  // Get name, price, and stock from the request body sent by Postman.
  const { name, price, stock } = req.body;

  // Create a new product document in MongoDB using the Product model.
  const product = await Product.create({ name, price, stock });

  // Send success response with status code 201, meaning "created".
  res.status(201).json({
    success: true,
    product
  });
});
// GET ALL PRODUCTS
// exports.getAllProducts = async (req, res) => {
//   try {
//     const products = await Product.find();

//     res.status(200).json({
//       success: true,
//       products
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };
// GET ALL PRODUCTS
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
// exports.getSingleProduct = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);

//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message: 'Product not found'
//       });
//     }

//     res.status(200).json({
//       success: true,
//       product
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };
// GET SINGLE PRODUCT
exports.getSingleProduct = asyncHandler(async (req, res) => {
  // Find one product using the id from the URL.
  // Example URL: /api/products/65abc123abc123abc123abc1
  const product = await Product.findById(req.params.id);

  // If no product is found, set status to 404 and throw an error.
  // The thrown error will go to errorHandler middleware.
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
// exports.updateProduct = async (req, res) => {
//   try {
//     const product = await Product.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       {
//         new: true,
//         runValidators: true
//       }
//     );

//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message: 'Product not found'
//       });
//     }

//     res.status(200).json({
//       success: true,
//       product
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };
// UPDATE PRODUCT
exports.updateProduct = asyncHandler(async (req, res) => {
  // Find product by id and update it using data from req.body.
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      // Return the updated product instead of the old product.
      new: true,

      // Run schema validations during update.
      runValidators: true
    }
  );

  // If no product is found with this id, throw 404 error.
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
// exports.deleteProduct = async (req, res) => {
//   try {
//     const product = await Product.findByIdAndDelete(req.params.id);

//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message: 'Product not found'
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: 'Product deleted successfully'
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };
// DELETE PRODUCT
exports.deleteProduct = asyncHandler(async (req, res) => {
  // Find product by id and delete it from MongoDB.
  const product = await Product.findByIdAndDelete(req.params.id);

  // If no product exists with this id, throw 404 error.
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