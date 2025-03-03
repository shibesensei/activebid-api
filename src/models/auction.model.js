// src/models/auction.model.js
const { pool } = require('../config/database');

exports.createAuction = async (data) => {
  const { product_id, start_time, end_time } = data;
  const query = `
    INSERT INTO test.auctions (product_id, start_time, end_time)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const values = [product_id, start_time, end_time];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

exports.getAuctionById = async (id) => {
  const query = `SELECT * FROM test.auctions WHERE id = $1;`;
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

exports.updateAuction = async (id, data) => {
  const { product_id, start_time, end_time } = data;
  const query = `
    UPDATE test.auctions
    SET product_id = $1, start_time = $2, end_time = $3
    WHERE id = $4
    RETURNING *;
  `;
  const values = [product_id, start_time, end_time, id];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

exports.blockAuction = async (id) => {
  const query = `
    UPDATE test.auctions
    SET blocked = true
    WHERE id = $1;
  `;
  await pool.query(query, [id]);
};
