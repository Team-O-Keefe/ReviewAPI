const { Pool } = require('pg')

const pool = new Pool({
  host: "localhost",
  // user: "coreyrobinson",
  port: 5432,
  database: "Review"
})

pool.connect()



module.exports = pool;