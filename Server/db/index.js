const { Pool } = require('pg');
const key = require('../config.js');

const pool = new Pool({
  host: key.host,
  user: key.user,
  port: 5432,
  database: "postgres",
  password: key.password
});

pool.connect();

module.exports = pool;
