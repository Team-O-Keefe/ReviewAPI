/* eslint-disable no-shadow */
/* eslint-disable camelcase */
var db = require('../db');

module.exports = {
  productReviews(queryParams, callback) {
    const {
      product_id, count, page, sort
    } = queryParams;

    const query = `SELECT reviews.id AS review_id, reviews.rating, to_timestamp(reviews.date/1000) AS date, reviews.summary, reviews.body, reviews.recommend, reviews.reviewer_name, reviews.response, reviews.helpfulness, json_agg(json_build_object('id', reviewPhoto.id, 'url', reviewphoto.url)) AS photos
      FROM
        reviews LEFT JOIN reviewPhoto
      ON
        reviewPhoto.review_id = reviews.id
      WHERE
        reviews.product_id = $1 AND reviews.reported = false
      GROUP BY
        reviews.id;`;

    db.query(query, [product_id], (err, result) => {
      if (err) {
        console.log('err on review query', err);
        callback(err, null);
      } else {
        callback(null, {
          product: product_id, count: count || 5, page: page || 1, results: result.rows
        });
      }
    });
  },
  productMetaData(queryParams, callback) {
    const { product_id } = queryParams;
    const metaDataOutput = { product_id };
    const characteristicsList = {};

    const queryRatings = `SELECT json_build_object(
      '1', sum(CASE WHEN reviews.rating = 1 THEN 1 ELSE 0 END),
      '2', sum(CASE WHEN reviews.rating = 2 THEN 1 ELSE 0 END),
      '3', sum(CASE WHEN reviews.rating = 3 THEN 1 ELSE 0 END),
      '4', sum(CASE WHEN reviews.rating = 4 THEN 1 ELSE 0 END),
      '5', sum(CASE WHEN reviews.rating = 5 THEN 1 ELSE 0 END)) AS ratings
      FROM
        reviews WHERE reviews.product_id = ${product_id}
      GROUP BY
        reviews.product_id;`;

    const queryMeta = `SELECT characteristicsReviews.characteristics_id, AVG(characteristicsReviews.value), characteristics.name
      FROM
        characteristicsReviews
      INNER JOIN
        characteristics
      ON
        characteristicsReviews.characteristics_id = characteristics.id
      WHERE
        product_id = ${product_id}
      GROUP BY
        characteristicsReviews.characteristics_id, characteristics.name;`;

    const queryRecommended = `SELECT json_build_object(
      'true', sum(CASE WHEN reviews.recommend = true THEN 1 ELSE 0 END),
      'false', sum(CASE WHEN reviews.recommend = false THEN 1 ELSE 0 END)) AS recommended
      FROM
        reviews WHERE product_id = ${product_id}
      GROUP BY
        reviews.product_id;`;

    db.query(queryRatings, (err, result) => {
      if (err) {
        console.log('err on meta query, ', err);
      } else {
        result.rows.length === 0
          ? metaDataOutput.ratings = {}
          : metaDataOutput.ratings = result.rows[0].ratings;
        db.query(queryMeta, (err, result) => {
          if (err) {
            console.log('err on meta query, ', err);
          } else {
            result.rows.forEach((row) => {
              characteristicsList[row.name] = { id: row.characteristics_id, value: row.avg };
            });
            metaDataOutput.characteristics = characteristicsList;
            db.query(queryRecommended, (err, result) => {
              if (err) {
                console.log('err on recommended, ', err);
                callback(err, null);
              } else {
                result.rows.length === 0 ? metaDataOutput.recommended = {} : metaDataOutput.recommended = result.rows[0].recommended;
                callback(null, metaDataOutput);
              }
            });
          }
        });
      }
    });
  },
  putHelpfulness: (reqParams, callback) => {
    const { review_id } = reqParams;
    const query = `UPDATE reviews
      SET
        helpfulness = helpfulness + 1
      WHERE
        id = ${review_id}`;

    db.query(query, (err, result) => {
      if (err) {
        // console.log('error put', err);
        callback(err, null);
      } else {
        // console.log('success put');
        callback(null, result);
      }
    });
  }
};
