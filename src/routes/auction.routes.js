// src/routes/auction.routes.js
const express = require('express');
const router = express.Router();
const auctionController = require('../controllers/auction.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/', authMiddleware.verify, auctionController.createAuction);
router.get('/:id', auctionController.getAuction);
router.put('/:id', authMiddleware.verify, auctionController.updateAuction);
router.delete('/:id', authMiddleware.verify, auctionController.blockAuction);

module.exports = router;


/**
 * @swagger
 * tags:
 *   name: Auctions
 *   description: Управление аукционами
 */

/**
 * @swagger
 * /api/auctions:
 *   post:
 *     summary: Создание аукциона
 *     tags: [Auctions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - product_id
 *               - start_time
 *               - end_time
 *             properties:
 *               product_id:
 *                 type: integer
 *               start_time:
 *                 type: string
 *                 format: date-time
 *               end_time:
 *                 type: string
 *                 format: date-time
 *             example:
 *               product_id: 1
 *               start_time: "2025-03-04T10:00:00Z"
 *               end_time: "2025-03-04T12:00:00Z"
 *     responses:
 *       201:
 *         description: Аукцион создан
 */


/**
 * @swagger
 * /api/auctions/{id}:
 *   get:
 *     summary: Получение данных аукциона по ID
 *     tags: [Auctions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID аукциона
 *     responses:
 *       200:
 *         description: Данные аукциона
 *       404:
 *         description: Аукцион не найден
 */


/**
 * @swagger
 * /api/auctions/{id}:
 *   put:
 *     summary: Обновление данных аукциона по ID
 *     tags: [Auctions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID аукциона
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_id:
 *                 type: integer
 *               start_time:
 *                 type: string
 *                 format: date-time
 *               end_time:
 *                 type: string
 *                 format: date-time
 *             example:
 *               product_id: 1
 *               start_time: "2025-03-04T11:00:00Z"
 *               end_time: "2025-03-04T13:00:00Z"
 *     responses:
 *       200:
 *         description: Аукцион обновлён
 */


/**
 * @swagger
 * /api/auctions/{id}:
 *   delete:
 *     summary: Блокировка или удаление аукциона по ID
 *     tags: [Auctions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID аукциона
 *     responses:
 *       200:
 *         description: Аукцион заблокирован или удалён
 */

