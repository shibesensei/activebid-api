// src/services/user.service.js
const userModel = require('../models/user.model');

exports.register = async (data) => {
  return await userModel.createUser(data);
};

exports.getUser = async (id) => {
  return await userModel.getUserById(id);
};

exports.updateUser = async (id, data) => {
  return await userModel.updateUser(id, data);
};

exports.disableUser = async (id) => {
  return await userModel.disableUser(id);
};
