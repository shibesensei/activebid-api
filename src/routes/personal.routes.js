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
