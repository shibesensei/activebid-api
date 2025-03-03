// src/models/product.model.js
const { pool } = require('../config/database');

exports.createProduct = async (data) => {
  const { name, description, price } = data;
  const query = `
    INSERT INTO test.products (name, description, price)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const values = [name, description, price];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

exports.getProductById = async (id) => {
  const query = `SELECT * FROM test.products WHERE id = $1;`;
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

exports.updateProduct = async (id, data) => {
  const { name, description, price } = data;
  const query = `
    UPDATE test.products
    SET name = $1, description = $2, price = $3
    WHERE id = $4
    RETURNING *;
  `;
  const values = [name, description, price, id];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

exports.blockProduct = async (id) => {
  const query = `
    UPDATE test.products
    SET blocked = true
    WHERE id = $1;
  `;
  await pool.query(query, [id]);
};
