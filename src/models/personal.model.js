// src/models/personal.model.js
const { pool } = require('../config/database');

exports.addPersonalData = async (data) => {
  const { user_id, phone, address } = data;
  const query = `
    INSERT INTO test.personal (user_id, phone, address)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const values = [user_id, phone, address];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

exports.getPersonalData = async (user_id) => {
  const query = `SELECT * FROM test.personal WHERE user_id = $1;`;
  const { rows } = await pool.query(query, [user_id]);
  return rows[0];
};

exports.updatePersonalData = async (user_id, data) => {
  const { phone, address } = data;
  const query = `
    UPDATE test.personal
    SET phone = $1, address = $2
    WHERE user_id = $3
    RETURNING *;
  `;
  const values = [phone, address, user_id];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

exports.blockPersonalData = async (user_id) => {
  const query = `
    UPDATE test.personal
    SET blocked = true
    WHERE user_id = $1;
  `;
  await pool.query(query, [user_id]);
};
