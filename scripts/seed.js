// scripts/seed.js
require('dotenv').config();
const { pool } = require('../src/config/database');

const seed = async () => {
  try {
    // Пример вставки тестового пользователя
    await pool.query(`
      INSERT INTO ${process.env.PGSCHEMA}.users (username, email, password)
      VALUES ('seeduser', 'seed@example.com', 'password')
      ON CONFLICT (email) DO NOTHING;
    `);

    console.log('Seeding completed successfully');
  } catch (error) {
    console.error('Seeding error:', error);
  } finally {
    pool.end();
  }
};

seed();
