// src/services/auction.service.js
const auctionModel = require('../models/auction.model');
const clickhouseService = require('./clickhouse.service');
const rabbitmqService = require('./rabbitmq.service');

exports.createAuction = async (data) => {
  const auction = await auctionModel.createAuction(data);
  rabbitmqService.sendMessage('auction.created', auction);
  // Архивирование создания аукциона
  await clickhouseService.insertAuctionArchive(auction, 'created');
  return auction;
};

exports.getAuction = async (id) => {
  return await auctionModel.getAuctionById(id);
};

exports.updateAuction = async (id, data) => {
  const oldAuction = await auctionModel.getAuctionById(id);
  const auction = await auctionModel.updateAuction(id, data);
  // Логирование обновления аукциона
  await clickhouseService.insertAuctionArchive(auction, 'updated');
  rabbitmqService.sendMessage('auction.updated', auction);
  return auction;
};

exports.blockAuction = async (id) => {
  await auctionModel.blockAuction(id);
  rabbitmqService.sendMessage('auction.blocked', { id });
  const auction = await auctionModel.getAuctionById(id);
  await clickhouseService.insertAuctionArchive(auction, 'blocked');
};
