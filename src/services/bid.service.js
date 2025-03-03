// src/services/bid.service.js
const bidModel = require('../models/bid.model');
const rabbitmqService = require('./rabbitmq.service');

exports.createBid = async (data) => {
  const bid = await bidModel.createBid(data);
  rabbitmqService.sendMessage('bid.created', bid);
  return bid;
};

exports.getBidsByAuction = async (auctionId) => {
  return await bidModel.getBidsByAuction(auctionId);
};

exports.cancelBid = async (id) => {
  await bidModel.cancelBid(id);
  rabbitmqService.sendMessage('bid.cancelled', { id });
};
