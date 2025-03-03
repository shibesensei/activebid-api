// src/controllers/bid.controller.js
const bidService = require('../services/bid.service');

exports.createBid = async (req, res, next) => {
  try {
    const bid = await bidService.createBid(req.body);
    res.status(201).json({ bid });
  } catch (error) {
    next(error);
  }
};

exports.getBidsByAuction = async (req, res, next) => {
  try {
    const bids = await bidService.getBidsByAuction(req.params.auctionId);
    res.json({ bids });
  } catch (error) {
    next(error);
  }
};

exports.cancelBid = async (req, res, next) => {
  try {
    await bidService.cancelBid(req.params.id);
    res.json({ message: 'Bid cancelled' });
  } catch (error) {
    next(error);
  }
};
