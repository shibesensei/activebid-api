// src/routes/bid.routes.js
const express = require('express');
const router = express.Router();
const bidController = require('../controllers/bid.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/', authMiddleware.verify, bidController.createBid);
router.get('/auction/:auctionId', bidController.getBidsByAuction);
router.delete('/:id', authMiddleware.verify, bidController.cancelBid);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Bids
 *   description: Управление ставками
 */

/**
 * @swagger
 * /api/bids:
 *   post:
 *     summary: Создание ставки
 *     tags: [Bids]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - auction_id
 *               - user_id
 *               - amount
 *             properties:
 *               auction_id:
 *                 type: integer
 *               user_id:
 *                 type: integer
 *               amount:
 *                 type: number
 *             example:
 *               auction_id: 1
 *               user_id: 1
 *               amount: 150.50
 *     responses:
 *       201:
 *         description: Ставка успешно создана
 */


/**
 * @swagger
 * /api/bids/auction/{auctionId}:
 *   get:
 *     summary: Получение всех ставок для аукциона по ID
 *     tags: [Bids]
 *     parameters:
 *       - in: path
 *         name: auctionId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID аукциона
 *     responses:
 *       200:
 *         description: Список ставок для данного аукциона
 *       404:
 *         description: Ставки не найдены
 */


/**
 * @swagger
 * /api/bids/{id}:
 *   delete:
 *     summary: Отмена ставки по ID
 *     tags: [Bids]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID ставки
 *     responses:
 *       200:
 *         description: Ставка отменена
 *       404:
 *         description: Ставка не найдена
 */