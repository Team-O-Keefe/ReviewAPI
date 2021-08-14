/* eslint-disable camelcase */
var express = require('express');
const morgan = require('morgan');
const db = require('./db');

var app = express();

var port = 3000;
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/reviews', (req, res) => {
  // eslint-disable-next-line no-unused-vars
  const { product_id,
    page,
    count,
    sort
  } = req.query;
  // const reviewStructure = {
  //   product: product_id,
  //   page: page || 1,
  //   count: count || 5
  // };
  const query = `SELECT reviews.id AS review_id, reviews.rating, to_timestamp(reviews.date/1000) AS date, reviews.summary, reviews.body, reviews.recommend, reviews.reviewer_name, reviews.response, reviews.helpfulness, json_agg(json_build_object('id', reviewPhoto.id, 'url', reviewphoto.url)) AS photos
    from reviews LEFT JOIN reviewPhoto
    ON reviewPhoto.review_id = reviews.id
     WHERE reviews.product_id = $1 AND reviews.reported = false
     GROUP BY reviews.id;`;

  db.query(query, [product_id], (err, result) => {
    if (err) {
      console.log('err on review query', err);
    } else {
      res.send({ product: product_id, count: count || 5, page: page || 1, results: result.rows });
    }
  });






});

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})


// current working
// `SELECT reviews.id AS review_id, reviews.rating, reviews.date, reviews.summary, reviews.body, reviews.recommend, reviews.reviewer_name, reviews.reviewer_email, reviews.response, reviews.helpfulness, json_agg(json_build_object('id', reviewPhoto.id, 'url', reviewphoto.url)) AS photos
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

  // const query = `SELECT product_info.product_id AS id, name, slogan, description, category, default_price, jsonb_agg(json_build_object('feature', features.feature, 'value', features.value)) AS features FROM product_info JOIN features ON features.product_id = product_info.product_id WHERE product_info.product_id=${productID} GROUP BY product_info.product_id;`;

  // json_object_agg('product',${product_id} ,'results', json_agg(SELECT * from Reviews WHERE Reviews.product_id = ${product_id}));`



  // SELECT reviews.product_id, jsonb_agg(json_build_object('review_id', reviews.id)) AS results FROM reviews WHERE reviews.product_id = ${product_id} GROUP BY reviews;`

  // SELECT * from reviews where product_id = ${product_id};