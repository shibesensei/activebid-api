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
