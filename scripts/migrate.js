// scripts/migrate.js
require('dotenv').config();
const { pool } = require('../src/config/database');

const createTables = async () => {
  try {
    // Создаём схему, если её нет
    await pool.query(`CREATE SCHEMA IF NOT EXISTS ${process.env.PGSCHEMA};`);

    // Пример создания типа для статуса товара
    await pool.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'product_status') THEN
          CREATE TYPE test.product_status AS ENUM ('active', 'blocked');
        END IF;
      END$$;
    `);

    // Таблица пользователей
    await pool.query(`
      CREATE TABLE IF NOT EXISTS ${process.env.PGSCHEMA}.users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Таблица конфиденциальных данных
    await pool.query(`
      CREATE TABLE IF NOT EXISTS ${process.env.PGSCHEMA}.personal (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES ${process.env.PGSCHEMA}.users(id),
        phone VARCHAR(20),
        address VARCHAR(255),
        blocked BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Таблица товаров
    await pool.query(`
      CREATE TABLE IF NOT EXISTS ${process.env.PGSCHEMA}.products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10,2) NOT NULL,
        status test.product_status DEFAULT 'active',
        blocked BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Таблица аукционов
    await pool.query(`
      CREATE TABLE IF NOT EXISTS ${process.env.PGSCHEMA}.auctions (
        id SERIAL PRIMARY KEY,
        product_id INTEGER REFERENCES ${process.env.PGSCHEMA}.products(id),
        start_time TIMESTAMP NOT NULL,
        end_time TIMESTAMP NOT NULL,
        blocked BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Таблица ставок
    await pool.query(`
      CREATE TABLE IF NOT EXISTS ${process.env.PGSCHEMA}.bids (
        id SERIAL PRIMARY KEY,
        auction_id INTEGER REFERENCES ${process.env.PGSCHEMA}.auctions(id),
        user_id INTEGER REFERENCES ${process.env.PGSCHEMA}.users(id),
        amount DECIMAL(10,2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('Migration completed successfully');
  } catch (error) {
    console.error('Migration error:', error);
  } finally {
    pool.end();
  }
};

createTables();
