// src/routes/user.routes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/', userController.register);
router.get('/:id', authMiddleware.verify, userController.getUser);
router.put('/:id', authMiddleware.verify, userController.updateUser);
router.delete('/:id', authMiddleware.verify, userController.disableUser);

module.exports = router;


/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Управление пользователями
 */

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Создание нового пользователя
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               username: testuser
 *               email: test@example.com
 *               password: password
 *     responses:
 *       201:
 *         description: Пользователь успешно создан
 *       400:
 *         description: Ошибка валидации данных
 */


/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Получение данных пользователя по ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID пользователя
 *     responses:
 *       200:
 *         description: Данные пользователя
 *       404:
 *         description: Пользователь не найден
 */


/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Обновление данных пользователя по ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
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
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *             example:
 *               username: newusername
 *               email: newemail@example.com
 *     responses:
 *       200:
 *         description: Пользователь успешно обновлён
 *       400:
 *         description: Ошибка валидации данных
 */


/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Отключение пользователя по ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID пользователя
 *     responses:
 *       200:
 *         description: Пользователь отключен
 *       404:
 *         description: Пользователь не найден
 */
