// src/services/product.service.js
const productModel = require('../models/product.model');
const clickhouseService = require('./clickhouse.service');
const rabbitmqService = require('./rabbitmq.service');

exports.createProduct = async (data) => {
  const product = await productModel.createProduct(data);
  rabbitmqService.sendMessage('product.created', product);
  // Архивирование создания товара
  await clickhouseService.insertProductArchive(product, 'created');
  return product;
};

exports.getProduct = async (id) => {
  return await productModel.getProductById(id);
};

exports.updateProduct = async (id, data) => {
  // Получаем старые данные для логирования изменений
  const oldProduct = await productModel.getProductById(id);
  const product = await productModel.updateProduct(id, data);
  // Логирование изменения товара
  const changeData = {
    change_id: Date.now(), // Простой способ генерации идентификатора изменений
    product_id: product.id,
    old_data: oldProduct,
    new_data: product,
  };
  await clickhouseService.insertProductChange(changeData);
  rabbitmqService.sendMessage('product.updated', product);
  return product;
};

exports.blockProduct = async (id) => {
  await productModel.blockProduct(id);
  rabbitmqService.sendMessage('product.blocked', { id });
  const product = await productModel.getProductById(id);
  await clickhouseService.insertProductArchive(product, 'blocked');
};
