const { protect } = require('../Middleware/authMiddleware');

const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');

// Private route: only logged-in user can create product
router.post('/create', protect, productController.createProduct);

// Public routes: anyone can view products
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getSingleProduct);

// Private routes: only logged-in user can update/delete product
router.put('/:id', protect, productController.updateProduct);
router.delete('/:id', protect, productController.deleteProduct);

module.exports = router;