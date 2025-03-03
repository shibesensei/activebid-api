// scripts/migrate-clickhouse.js
require('dotenv').config();
const { clickhouse } = require('../src/config/database');

const createTables = async () => {
  try {
    const queries = [

      `CREATE TABLE IF NOT EXISTS auction_archive.product_archive (
          product_id UInt32,
          name String,
          description String,
          price Decimal(10,2),
          status String,
          blocked UInt8,
          event String,
          event_time DateTime DEFAULT now()
      ) ENGINE = MergeTree()
      ORDER BY event_time;`,


      `CREATE TABLE IF NOT EXISTS auction_archive.auction_archive (
          auction_id UInt32,
          product_id UInt32,
          start_time DateTime,
          end_time DateTime,
          blocked UInt8,
          event String,
          event_time DateTime DEFAULT now()
      ) ENGINE = MergeTree()
      ORDER BY event_time;`,


      `CREATE TABLE IF NOT EXISTS auction_archive.purchase_history (
          purchase_id UInt32,
          user_id UInt32,
          auction_id UInt32,
          amount Decimal(10,2),
          purchase_time DateTime DEFAULT now()
      ) ENGINE = MergeTree()
      ORDER BY purchase_time;`,


      `CREATE TABLE IF NOT EXISTS auction_archive.user_activity (
          user_id UInt32,
          action String,
          description String,
          activity_time DateTime DEFAULT now()
      ) ENGINE = MergeTree()
      ORDER BY activity_time;`,


      `CREATE TABLE IF NOT EXISTS auction_archive.personal_data_changes (
          change_id UInt32,
          user_id UInt32,
          old_data String,
          new_data String,
          change_time DateTime DEFAULT now()
      ) ENGINE = MergeTree()
      ORDER BY change_time;`,


      `CREATE TABLE IF NOT EXISTS auction_archive.product_changes (
          change_id UInt32,
          product_id UInt32,
          old_data String,
          new_data String,
          change_time DateTime DEFAULT now()
      ) ENGINE = MergeTree()
      ORDER BY change_time;`
    ];

    for (const query of queries) {
      console.log("Executing:", query);
      await clickhouse.query(query).toPromise();
    }
    console.log('ClickHouse migration completed successfully');
  } catch (error) {
    console.error('ClickHouse migration error:', error);
  }
};

createTables();
