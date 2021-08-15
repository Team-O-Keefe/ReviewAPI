/* eslint-disable brace-style */
/* eslint-disable camelcase */
var express = require('express');
const morgan = require('morgan');
const db = require('./db');
// require('newrelic');
const reviewModel = require('./models/reviews');
var app = express();

var port = 3000;
// app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/reviews', (req, res) => {
  // eslint-disable-next-line no-unused-vars
  // const {
  //   product_id,
  //   page,
  //   count,
  //   sort
  // } = req.query;
  // const reviewStructure = {
  //   product: product_id,
  //   page: page || 1,
  //   count: count || 5
  // };
  // const query = `SELECT reviews.id AS review_id, reviews.rating, to_timestamp(reviews.date/1000) AS date, reviews.summary, reviews.body, reviews.recommend, reviews.reviewer_name, reviews.response, reviews.helpfulness, json_agg(json_build_object('id', reviewPhoto.id, 'url', reviewphoto.url)) AS photos
  //   from reviews LEFT JOIN reviewPhoto
  //   ON reviewPhoto.review_id = reviews.id
  //    WHERE reviews.product_id = $1 AND reviews.reported = false
  //    GROUP BY reviews.id;`;

  // db.query(query, [product_id], (err, result) => {
  //   if (err) {
  //     console.log('err on review query', err);
  //   } else {
  //     res.send({
  //       product: product_id, count: count || 5, page: page || 1, results: result.rows
  //     });
  //   }
  // });
  reviewModel.productReviews(req.query, (err, result) => {
    if (err) {
      console.log('error get reviews,', err);
      res.end();
    } else {
      console.log('success get reviews');
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
  // const { product_id } = req.query;
  // const metaDataOutput = { product_id };
  // const characteristicsList = {};

  // const queryRatings = `SELECT json_build_object(
  // '1', sum(CASE WHEN reviews.rating = 1 THEN 1 ELSE 0 END),
  // '2', sum(CASE WHEN reviews.rating = 2 THEN 1 ELSE 0 END),
  // '3', sum(CASE WHEN reviews.rating = 3 THEN 1 ELSE 0 END),
  // '4', sum(CASE WHEN reviews.rating = 4 THEN 1 ELSE 0 END),
  // '5', sum(CASE WHEN reviews.rating = 5 THEN 1 ELSE 0 END)) AS ratings
  // FROM reviews WHERE reviews.product_id = ${product_id}
  // GROUP BY reviews.product_id`;

  // const queryMeta = `SELECT characteristicsReviews.characteristics_id, AVG(characteristicsReviews.value), characteristics.name
  // FROM characteristicsReviews INNER JOIN characteristics ON characteristicsReviews.characteristics_id = characteristics.id
  // WHERE product_id = ${product_id}
  // GROUP BY characteristicsReviews.characteristics_id,
  // characteristics.name`;

  // const queryRecommended = `SELECT json_build_object(
  // 'true', sum(CASE WHEN reviews.recommend = true THEN 1 ELSE 0 END),
  // 'false', sum(CASE WHEN reviews.recommend = false THEN 1 ELSE 0 END)) AS recommended
  // FROM reviews WHERE product_id = ${product_id}
  // GROUP BY reviews.product_id`;

  // db.query(queryRatings, (err, result) => {
  //   if (err) {
  //     console.log('err on meta query, ', err);
  //   } else {
  //     metaDataOutput.ratings = result.rows[0].ratings;
  //     db.query(queryMeta, (err, result) => {
  //       if (err) {
  //         console.log('err on meta query, ', err);
  //       } else {
  //         result.rows.forEach((row) => {
  //           characteristicsList[row.name] = { id: row.characteristics_id, value: row.avg };
  //         });
  //         metaDataOutput.characteristics = characteristicsList;
  //         db.query(queryRecommended, (err, result) => {
  //           if (err) {
  //             console.log('err on recommended, ', err);
  //           } else {
  //             metaDataOutput.recommended = result.rows[0].recommended;
  //             res.send(metaDataOutput);
  //           }
  //         });
  //       }
  //     });
  //   }
  // });
});

app.put('/api/reviews/:review_id/helpful', (req, res) => {
  // const { review_id } = req.params;
  // const query = `UPDATE reviews
  // SET
  //   helpfulness = helpfulness + 1
  // WHERE
  //   id = ${review_id}`;
  // db.query(query, (err, result) => {
  //   if (err) {
  //     console.log('error put', err);
  //   } else {
  //     console.log('success put');
  //     res.send(result);
  //   }
  // });
  reviewModel.putHelpfulness(req.params, (err, result) => {
    if (err) {
      res.end();
    } else {
      res.sendStatus(201);
    }
  });
});
// });

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});

// SELECT characteristicsReviews.id,
//   characteristicsReviews.value, characteristics.product_id, characteristicsReviews.review_id, characteristics.name, characteristics.id
//  FROM characteristicsReviews INNER JOIN characteristics
//  ON characteristicsReviews.characteristics_id = characteristics.id
//  WHERE characteristics.product_id = ${product_id};

// sum(CASE WHEN reviews.rating = 1 THEN 1 ELSE 0 END) review_1,
// sum(CASE WHEN reviews.rating = 2 THEN 1 ELSE 0 END) review_2,
// sum(CASE WHEN reviews.rating = 3 THEN 1 ELSE 0 END) review_3,
// sum(CASE WHEN reviews.rating = 4 THEN 1 ELSE 0 END) review_4,
// sum(CASE WHEN reviews.rating = 5 THEN 1 ELSE 0 END) review_5

// current working
// `SELECT reviews.id AS review_id, reviews.rating, reviews.date, reviews.summary, reviews.body,
// reviews.recommend, reviews.reviewer_name, reviews.response, reviews.helpfulness,
// json_agg(json_build_object('id', reviewPhoto.id, 'url', reviewphoto.url)) AS photos
// from reviews LEFT JOIN reviewPhoto
// ON reviewPhoto.review_id = reviews.id
//  WHERE reviews.product_id = ${product_id} AND reviews.reported = false
//  GROUP BY reviews.id;`;

// `SELECT row_to_json(reviewList) as reviews
// FROM(
//   SELECT *,
//   (SELECT json_agg(reviewurls)
//   FROM (
//     SELECT * from reviewPhoto WHERE reviewPhoto.review_id = a.id
//   ) reviewurls
//   ) as reviewPhotos
// FROM reviews as a) reviewList`;

// SELECT * from reviews INNER JOIN reviewphoto
//   ON reviews.id = reviewPhoto.review_id
//   WHERE reviews.product_id = ${product_id};

// json_object_agg('product',${product_id} ,'results', json_agg(SELECT * from Reviews
// WHERE Reviews.product_id = ${product_id}));`

// SELECT reviews.product_id, jsonb_agg(json_build_object('review_id', reviews.id)) AS results
// FROM reviews WHERE reviews.product_id = ${product_id} GROUP BY reviews;`

// SELECT * from reviews where product_id = ${product_id};
