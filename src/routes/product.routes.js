// src/routes/product.routes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/', authMiddleware.verify, productController.createProduct);
router.get('/:id', productController.getProduct);
router.put('/:id', authMiddleware.verify, productController.updateProduct);
router.delete('/:id', authMiddleware.verify, productController.blockProduct);

module.exports = router;
