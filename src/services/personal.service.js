// src/services/personal.service.js
const personalModel = require('../models/personal.model');
const clickhouseService = require('./clickhouse.service');

exports.addPersonalData = async (data) => {
  return await personalModel.addPersonalData(data);
};

exports.getPersonalData = async (userId) => {
  return await personalModel.getPersonalData(userId);
};

exports.updatePersonalData = async (userId, data) => {
  const oldData = await personalModel.getPersonalData(userId);
  const newData = await personalModel.updatePersonalData(userId, data);
  const changeData = {
    change_id: Date.now(),
    user_id: userId,
    old_data: oldData,
    new_data: newData
  };
  await clickhouseService.insertPersonalDataChange(changeData);
  return newData;
};

exports.blockPersonalData = async (userId) => {
  return await personalModel.blockPersonalData(userId);
};
