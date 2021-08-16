const { Pool } = require('pg');

const pool = new Pool({
  host: "localhost",
  user: "coreyrobinson",
  port: 5432,
  database: "Review",
});

pool.connect();
// const pgp = require('pg-promise')();
// const cn = {
//   host: "localhost",
//   user: "coreyrobinson",
//   port: 5432,
//   database: "Review",
// };

// const db = pgp(cn);

module.exports = pool;