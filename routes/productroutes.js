const { protect } = require('../Middleware/authMiddleware');
const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');

router.post('/create', protect, productController.createProduct);

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getSingleProduct);
router.put('/:id', protect, productController.updateProduct);
router.delete('/:id', protect, productController.deleteProduct);

module.exports = router;