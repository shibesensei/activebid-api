// src/controllers/auction.controller.js
const auctionService = require('../services/auction.service');

exports.createAuction = async (req, res, next) => {
  try {
    const auction = await auctionService.createAuction(req.body);
    res.status(201).json({ auction });
  } catch (error) {
    next(error);
  }
};

exports.getAuction = async (req, res, next) => {
  try {
    const auction = await auctionService.getAuction(req.params.id);
    res.json({ auction });
  } catch (error) {
    next(error);
  }
};

exports.updateAuction = async (req, res, next) => {
  try {
    const auction = await auctionService.updateAuction(req.params.id, req.body);
    res.json({ auction });
  } catch (error) {
    next(error);
  }
};

exports.blockAuction = async (req, res, next) => {
  try {
    await auctionService.blockAuction(req.params.id);
    res.json({ message: 'Auction blocked' });
  } catch (error) {
    next(error);
  }
};
