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

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Управление товарами
 */

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Создание товара
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *             example:
 *               name: "Test Product"
 *               description: "Описание товара"
 *               price: 99.99
 *     responses:
 *       201:
 *         description: Товар успешно создан
 */


/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Получение товара по ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID товара
 *     responses:
 *       200:
 *         description: Данные товара
 *       404:
 *         description: Товар не найден
 */


/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Обновление данных товара по ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID товара
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *             example:
 *               name: "Updated Product"
 *               description: "Обновленное описание"
 *               price: 79.99
 *     responses:
 *       200:
 *         description: Товар обновлён
 */


/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Блокировка или удаление товара по ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID товара
 *     responses:
 *       200:
 *         description: Товар заблокирован или удалён
 */