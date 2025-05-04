require('dotenv').config();
const { ClickHouse } = require('clickhouse');

// Создание экземпляра ClickHouse
const clickhouse = new ClickHouse({
  url: process.env.CLICKHOUSE_HOST || 'http://localhost',
  port: process.env.CLICKHOUSE_PORT || 8123,
  debug: false,
  basicAuth: {
    username: process.env.CLICKHOUSE_USER || 'default',
    password: process.env.CLICKHOUSE_PASSWORD || '',
  },
  isUseGzip: false,
  format: 'json',
});

(async () => {
  try {
    // Создание базы данных, если она не существует
    const createDatabaseQuery = `CREATE DATABASE IF NOT EXISTS auction_archive;`;
    console.log('Executing:', createDatabaseQuery);
    await clickhouse.query(createDatabaseQuery).toPromise();

    // Массив SQL запросов для создания таблиц с логическими связями
    const queries = [
      `CREATE DATABASE IF NOT EXISTS auction_archive;`,
    
      `CREATE TABLE IF NOT EXISTS auction_archive.product_archive (
          product_id UInt32,
          name String,
          description String,
          price Decimal(10,2),
          status String,
          blocked UInt8,
          event String,
          event_time DateTime64(0, 'UTC') DEFAULT now(),
          PRIMARY KEY (product_id, event_time),
          INDEX idx_event_time (event_time) TYPE minmax GRANULARITY 3
      ) ENGINE = MergeTree() 
      ORDER BY (product_id, event_time);`,
    
      `CREATE TABLE IF NOT EXISTS auction_archive.auction_archive (
          auction_id UInt32,
          product_id UInt32, -- Связь с product_archive
          start_time DateTime64(0, 'UTC'),
          end_time DateTime64(0, 'UTC'),
          blocked UInt8,
          event String,
          event_time DateTime64(0, 'UTC') DEFAULT now(),
          PRIMARY KEY (auction_id, product_id), -- Обновили PRIMARY KEY
      ) ENGINE = MergeTree()
      ORDER BY (auction_id, product_id, event_time);`,
    
      `CREATE TABLE IF NOT EXISTS auction_archive.purchase_history (
          purchase_id UInt32,
          user_id UInt32, -- Связь с user_activity
          auction_id UInt32, -- Связь с auction_archive
          amount Decimal(10,2),
          purchase_time DateTime64(0, 'UTC') DEFAULT now(),
          PRIMARY KEY (purchase_id), -- PRIMARY KEY для purchase_id
      ) ENGINE = MergeTree()
      ORDER BY (purchase_id, purchase_time);`,
    
      `CREATE TABLE IF NOT EXISTS auction_archive.user_activity (
          user_id UInt32,
          action String,
          description String,
          activity_time DateTime64(0, 'UTC') DEFAULT now(),
          PRIMARY KEY (user_id, activity_time),  -- PRIMARY KEY должен быть частью ORDER BY
      ) ENGINE = MergeTree()
      ORDER BY (user_id, activity_time);`,
    
      `CREATE TABLE IF NOT EXISTS auction_archive.personal_data_changes (
          change_id UInt64,
          user_id UInt32, -- Связь с user_activity
          old_data String,
          new_data String,
          change_time DateTime64(0, 'UTC') DEFAULT now(),
          PRIMARY KEY (user_id, change_time), -- Связь с user_id и change_time
      ) ENGINE = MergeTree()
      ORDER BY (user_id, change_time);`,
    
      `CREATE TABLE IF NOT EXISTS auction_archive.product_changes (
          change_id UInt64,
          product_id UInt32, -- Связь с product_archive
          old_data String,
          new_data String,
          change_time DateTime64(0, 'UTC') DEFAULT now(),
          PRIMARY KEY (product_id, change_time), -- Связь с product_id и change_time
      ) ENGINE = MergeTree()
      ORDER BY (product_id, change_time);`,
    ];

    // Выполнение запросов для создания таблиц
    for (const sql of queries) {
      console.log('Executing:', sql);
      await clickhouse.query(sql).toPromise();
    }

    console.log('ClickHouse migration completed successfully');
  } catch (err) {
    console.error('ClickHouse migration error:', err);
    process.exit(1);
  }
})();
