// src/controllers/personal.controller.js
const personalService = require('../services/personal.service');

exports.addPersonalData = async (req, res, next) => {
  try {
    const data = await personalService.addPersonalData(req.body);
    res.status(201).json({ data });
  } catch (error) {
    next(error);
  }
};

exports.getPersonalData = async (req, res, next) => {
  try {
    const data = await personalService.getPersonalData(req.params.userId);
    res.json({ data });
  } catch (error) {
    next(error);
  }
};

exports.updatePersonalData = async (req, res, next) => {
  try {
    const data = await personalService.updatePersonalData(req.params.userId, req.body);
    res.json({ data });
  } catch (error) {
    next(error);
  }
};

exports.blockPersonalData = async (req, res, next) => {
  try {
    await personalService.blockPersonalData(req.params.userId);
    res.json({ message: 'Personal data blocked' });
  } catch (error) {
    next(error);
  }
};
