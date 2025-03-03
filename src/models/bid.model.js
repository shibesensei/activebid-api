// src/models/bid.model.js
const { pool } = require('../config/database');

exports.createBid = async (data) => {
  const { auction_id, user_id, amount } = data;
  const query = `
    INSERT INTO test.bids (auction_id, user_id, amount)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const values = [auction_id, user_id, amount];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

exports.getBidsByAuction = async (auction_id) => {
  const query = `SELECT * FROM test.bids WHERE auction_id = $1;`;
  const { rows } = await pool.query(query, [auction_id]);
  return rows;
};

exports.cancelBid = async (id) => {
  const query = `
    DELETE FROM test.bids
    WHERE id = $1;
  `;
  await pool.query(query, [id]);
};
