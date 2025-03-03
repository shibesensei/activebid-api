// src/controllers/product.controller.js
const productService = require('../services/product.service');

exports.createProduct = async (req, res, next) => {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json({ product });
  } catch (error) {
    next(error);
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const product = await productService.getProduct(req.params.id);
    res.json({ product });
  } catch (error) {
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const product = await productService.updateProduct(req.params.id, req.body);
    res.json({ product });
  } catch (error) {
    next(error);
  }
};

exports.blockProduct = async (req, res, next) => {
  try {
    await productService.blockProduct(req.params.id);
    res.json({ message: 'Product blocked' });
  } catch (error) {
    next(error);
  }
};
