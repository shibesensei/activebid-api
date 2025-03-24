// src/routes/auth.routes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Регистрация и логин
router.post('/register', authController.register);
router.post('/login', authController.login);

// Защищённый маршрут для проверки токена
router.get('/verify', authMiddleware.verify, authController.verifyToken);

// Выход
router.post('/logout', authMiddleware.verify, authController.logout);

module.exports = router;



/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Регистрация нового пользователя
 *     tags: [Auth]
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
 *         description: Пользователь успешно зарегистрирован
 *       400:
 *         description: Ошибка валидации данных
 */


/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Авторизация пользователя
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               email: test@example.com
 *               password: password
 *     responses:
 *       200:
 *         description: Успешная авторизация, возвращается JWT-токен
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Неверные учетные данные
 */


/**
 * @swagger
 * /api/auth/verify:
 *   get:
 *     summary: Проверка валидности JWT
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Токен валиден
 *       401:
 *         description: Токен недействителен или отсутствует
 */


/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Выход пользователя из системы
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Пользователь успешно вышел
 */
