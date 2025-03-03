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
