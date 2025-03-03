// src/server.js
const app = require('./app');
const { pool } = require('./config/database');

const PORT = process.env.PORT || 3000;


pool.query(`SET search_path TO ${process.env.PGSCHEMA};`)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error setting PostgreSQL search_path:', err);
    process.exit(1);
  });
