// src/routes/personal.routes.js
const express = require('express');
const router = express.Router();
const personalController = require('../controllers/personal.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/', authMiddleware.verify, personalController.addPersonalData);
router.get('/:userId', authMiddleware.verify, personalController.getPersonalData);
router.put('/:userId', authMiddleware.verify, personalController.updatePersonalData);
router.delete('/:userId', authMiddleware.verify, personalController.blockPersonalData);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Personal
 *   description: Управление персональными данными
 */

/**
 * @swagger
 * /api/personal:
 *   post:
 *     summary: Добавление персональных данных
 *     tags: [Personal]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *             example:
 *               user_id: 1
 *               phone: "+7 999 1234567"
 *               address: "Москва, ул. Пушкина, д. 1"
 *     responses:
 *       201:
 *         description: Персональные данные добавлены
 */


/**
 * @swagger
 * /api/personal/{userId}:
 *   get:
 *     summary: Получение персональных данных по ID пользователя
 *     tags: [Personal]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID пользователя
 *     responses:
 *       200:
 *         description: Персональные данные пользователя
 *       404:
 *         description: Данные не найдены
 */


/**
 * @swagger
 * /api/personal/{userId}:
 *   put:
 *     summary: Обновление персональных данных по ID пользователя
 *     tags: [Personal]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID пользователя
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *             example:
 *               phone: "+7 999 7654321"
 *               address: "Москва, ул. Ленина, д. 2"
 *     responses:
 *       200:
 *         description: Персональные данные обновлены
 */


/**
 * @swagger
 * /api/personal/{userId}:
 *   delete:
 *     summary: Блокировка/удаление персональных данных по ID пользователя
 *     tags: [Personal]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID пользователя
 *     responses:
 *       200:
 *         description: Персональные данные заблокированы/удалены
 */