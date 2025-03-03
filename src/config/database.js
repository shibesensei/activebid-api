// src/config/database.js
const { Pool } = require('pg');
const { ClickHouse } = require('clickhouse');

// Инициализация PostgreSQL Pool. Для использования схемы test,
// либо можно явно задавать схему в запросах, либо установить search_path.
const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
});

// Инициализация ClickHouse
const clickhouse = new ClickHouse({
  url: `http://${process.env.CLICKHOUSE_HOST}`,
  port: process.env.CLICKHOUSE_PORT,
  basicAuth: {
    username: process.env.CLICKHOUSE_USER,
    password: process.env.CLICKHOUSE_PASSWORD,
  },
  isUseGzip: false,
});

module.exports = {
  pool,
  clickhouse,
};
