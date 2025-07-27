// db.js
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'db_qldvxp', // chỉnh tên nếu khác
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;