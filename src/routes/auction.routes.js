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
