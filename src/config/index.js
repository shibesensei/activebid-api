// src/config/index.js
require('dotenv').config();

const database = require('./database');
const rabbitmq = require('./rabbitmq');
const jwtConfig = require('./jwt');

module.exports = {
  database,
  rabbitmq,
  jwtConfig,
};
