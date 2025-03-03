// src/controllers/user.controller.js
const userService = require('../services/user.service');

exports.register = async (req, res, next) => {
  try {
    const user = await userService.register(req.body);
    res.status(201).json({ user });
  } catch (error) {
    next(error);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await userService.getUser(req.params.id);
    res.json({ user });
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    res.json({ user });
  } catch (error) {
    next(error);
  }
};

exports.disableUser = async (req, res, next) => {
  try {
    await userService.disableUser(req.params.id);
    res.json({ message: 'User disabled' });
  } catch (error) {
    next(error);
  }
};
