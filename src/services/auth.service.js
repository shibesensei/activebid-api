// src/services/auth.service.js
const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const userService = require('./user.service');

exports.register = async (data) => {
  // Регистрация пользователя через userService
  return await userService.register(data);
};

exports.login = async (data) => {
  // Здесь должна быть проверка email и пароля (с хешированием в реальном приложении)
  const { email, password } = data;
  const payload = { email };
  const token = jwt.sign(payload, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });
  return token;
};

exports.verifyToken = async (token) => {
  try {
    return jwt.verify(token, jwtConfig.secret);
  } catch (error) {
    throw new Error('Invalid token');
  }
};

exports.logout = async (token) => {

  return true;
};
