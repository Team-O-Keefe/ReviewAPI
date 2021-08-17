/* eslint-disable brace-style */
/* eslint-disable camelcase */
var express = require('express');
// const morgan = require('morgan');
// const db = require('./db');
// require('newrelic');
const reviewModel = require('./models/reviews');
var app = express();

var port = 3000;
// app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/reviews', (req, res) => {
  reviewModel.productReviews(req.query, (err, result) => {
    if (err) {
      console.log('error get reviews,', err);
      res.end();
    } else {
      // console.log('success get reviews');
      res.send(result);
    }
  });
});

app.get('/api/reviews/meta', (req, res) => {
  reviewModel.productMetaData(req.query, (err, result) => {
    if (err) {
      console.log('error get metaData', err);
      res.end();
    } else {
      // console.log('success get metaData');
      res.send(result);
    }
  });
});
app.post('/api/reviews', (req, res) => {
  const {
    product_id,
    rating,
    summary,
    body,
    recommend,
    name,
    email,
    photos,
    characteristics
  } = req.body;

  //insert into Review Table
  const reviewInsertQuery = `INSERT INTO reviews (product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness)
  VALUES
    (${product_id}, ${rating}, ${Date.now()}, ${summary}, ${body}, ${recommend}, false, ${name}, ${email}, null, 0)`;

  const revPhotoInsertQuery = `INSERT INTO reviewPhoto (review_id, url)
  VALUES
  (SELECT id FROM reviews WHERE product_id = ${product_id})`
  // db.query(query, (err, result) => {
  //   if (err) {
  //     console.log('error post', err);
  //   } else {
  //     res.send(result.rows);
  //   }
  // });
});

app.put('/api/reviews/:review_id/helpful', (req, res) => {
  reviewModel.putHelpfulness(req.params, (err, result) => {
    if (err) {
      res.end();
    } else {
      res.sendStatus(204);
    }
  });
});

app.put('/api/reviews/:review_id/report', (req, res) => {
  reviewModel.putReported(req.params, (err, result) => {
    if (err) {
      res.end();
    } else {
      res.sendStatus(204);
    }
  });
});

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
