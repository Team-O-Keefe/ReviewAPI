var express = require('express');
const db = require('./db');

var app = express()

var port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/reviews', (req, res) => {
  const {product_id} = req.query;
  db.query(`SELECT * from Reviews WHERE Reviews.product_id = ${product_id} LIMIT 3`, (err, result) => {
    if (err) {
      console.log('error: ', err)
      res.end();
    } else {
      res.send(result.rows);
    }
  });

});

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})