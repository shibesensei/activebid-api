// src/models/user.model.js
const { pool } = require('../config/database');

exports.createUser = async (data) => {
  const { username, email, password } = data;
  const query = `
    INSERT INTO test.users (username, email, password)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const values = [username, email, password];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

exports.getUserById = async (id) => {
  const query = `SELECT * FROM test.users WHERE id = $1;`;
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

exports.updateUser = async (id, data) => {
  const { username, email } = data;
  const query = `
    UPDATE test.users
    SET username = $1, email = $2
    WHERE id = $3
    RETURNING *;
  `;
  const values = [username, email, id];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

exports.disableUser = async (id) => {
  const query = `
    UPDATE test.users
    SET active = false
    WHERE id = $1;
  `;
  await pool.query(query, [id]);
};
