// src/services/clickhouse.service.js
const { clickhouse } = require('../config/database');

// Helper: JS Date -> 'YYYY-MM-DD HH:mm:ss'
function formatCHDateTime(dt) {
  if (!(dt instanceof Date)) return dt;
  const iso = dt.toISOString().slice(0, 19); // '2025-03-04T10:00:00'
  return iso.replace('T', ' ');          // '2025-03-04 10:00:00'
}

const executeQuery = async (query) => {
  try {
    await clickhouse.query(query).toPromise();
  } catch (error) {
    console.error('ClickHouse error:', error);
  }
};

// Архив товаров
exports.insertProductArchive = async (data, event) => {
  const query = `
    INSERT INTO product_archive
      (product_id, name, description, price, status, blocked, event, event_time)
    VALUES
      (
        ${data.id},
        '${data.name}',
        '${data.description}',
        ${data.price},
        '${data.status || 'active'}',
        ${data.blocked ? 1 : 0},
        '${event}',
        now()
      )
  `;
  await executeQuery(query);
};

// Архив аукционов
exports.insertAuctionArchive = async (data, event) => {
  const start = formatCHDateTime(data.start_time);
  const end   = formatCHDateTime(data.end_time);

  const query = `
    INSERT INTO auction_archive
      (auction_id, product_id, start_time, end_time, blocked, event, event_time)
    VALUES
      (
        ${data.id},
        ${data.product_id},
        toDateTime64('${start}', 0, 'UTC'),
        toDateTime64('${end}',   0, 'UTC'),
        ${data.blocked ? 1 : 0},
        '${event}',
        now()
      )
  `;
  await executeQuery(query);
};

// История покупок
exports.insertPurchaseHistory = async (data) => {
  const query = `
    INSERT INTO purchase_history
      (purchase_id, user_id, auction_id, amount, purchase_time)
    VALUES
      (
        ${data.purchase_id},
        ${data.user_id},
        ${data.auction_id},
        ${data.amount},
        now()
      )
  `;
  await executeQuery(query);
};

// Активность пользователей
exports.insertUserActivity = async (data) => {
  const query = `
    INSERT INTO user_activity
      (user_id, action, description, activity_time)
    VALUES
      (
        ${data.user_id},
        '${data.action}',
        '${data.description}',
        now()
      )
  `;
  await executeQuery(query);
};

// Изменение конфиденциальных данных
exports.insertPersonalDataChange = async (data) => {
  const query = `
    INSERT INTO personal_data_changes
      (change_id, user_id, old_data, new_data, change_time)
    VALUES
      (
        ${data.change_id},
        ${data.user_id},
        '${JSON.stringify(data.old_data)}',
        '${JSON.stringify(data.new_data)}',
        now()
      )
  `;
  await executeQuery(query);
};

// Изменение товаров
exports.insertProductChange = async (data) => {
  const query = `
    INSERT INTO product_changes
      (change_id, product_id, old_data, new_data, change_time)
    VALUES
      (
        ${data.change_id},
        ${data.product_id},
        '${JSON.stringify(data.old_data)}',
        '${JSON.stringify(data.new_data)}',
        now()
      )
  `;
  await executeQuery(query);
};
