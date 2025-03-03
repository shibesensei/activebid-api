// src/routes/bid.routes.js
const express = require('express');
const router = express.Router();
const bidController = require('../controllers/bid.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/', authMiddleware.verify, bidController.createBid);
router.get('/auction/:auctionId', bidController.getBidsByAuction);
router.delete('/:id', authMiddleware.verify, bidController.cancelBid);

module.exports = router;
