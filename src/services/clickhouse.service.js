// src/services/clickhouse.service.js
const { clickhouse } = require('../config/database');

const executeQuery = async (query, params = []) => {
  try {
    await clickhouse.query(query, params).toPromise();
  } catch (error) {
    console.error('ClickHouse error:', error);
  }
};

// Архив товаров
exports.insertProductArchive = async (data, event) => {
  const query = `
    INSERT INTO product_archive (product_id, name, description, price, status, blocked, event, event_time)
    VALUES (?, ?, ?, ?, ?, ?, ?, now())
  `;
  const params = [
    data.id,
    data.name,
    data.description,
    data.price,
    data.status || 'active',
    data.blocked ? 1 : 0,
    event
  ];
  await executeQuery(query, params);
};

// Архив аукционов
exports.insertAuctionArchive = async (data, event) => {
  const query = `
    INSERT INTO auction_archive (auction_id, product_id, start_time, end_time, blocked, event, event_time)
    VALUES (?, ?, ?, ?, ?, ?, now())
  `;
  const params = [
    data.id,
    data.product_id,
    data.start_time,
    data.end_time,
    data.blocked ? 1 : 0,
    event
  ];
  await executeQuery(query, params);
};

// История покупок
exports.insertPurchaseHistory = async (data) => {
  const query = `
    INSERT INTO purchase_history (purchase_id, user_id, auction_id, amount, purchase_time)
    VALUES (?, ?, ?, ?, now())
  `;
  const params = [
    data.purchase_id,
    data.user_id,
    data.auction_id,
    data.amount
  ];
  await executeQuery(query, params);
};

// Активность пользователей
exports.insertUserActivity = async (data) => {
  const query = `
    INSERT INTO user_activity (user_id, action, description, activity_time)
    VALUES (?, ?, ?, now())
  `;
  const params = [
    data.user_id,
    data.action,
    data.description
  ];
  await executeQuery(query, params);
};

// Изменение конфиденциальных данных
exports.insertPersonalDataChange = async (data) => {
  const query = `
    INSERT INTO personal_data_changes (change_id, user_id, old_data, new_data, change_time)
    VALUES (?, ?, ?, ?, now())
  `;
  const params = [
    data.change_id, // Например, можно генерировать через Date.now()
    data.user_id,
    JSON.stringify(data.old_data),
    JSON.stringify(data.new_data)
  ];
  await executeQuery(query, params);
};

// Изменение товаров
exports.insertProductChange = async (data) => {
  const query = `
    INSERT INTO product_changes (change_id, product_id, old_data, new_data, change_time)
    VALUES (?, ?, ?, ?, now())
  `;
  const params = [
    data.change_id,
    data.product_id,
    JSON.stringify(data.old_data),
    JSON.stringify(data.new_data)
  ];
  await executeQuery(query, params);
};
