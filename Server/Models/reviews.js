// var db = require('../db');

// module.exports = {
//   productReviews: function (queryParams, callback) {
//     const { product_id, count, page, sort } = queryParams;
//     db.query(`SELECT * from reviews limit 10;`
//     , (err, result) => {
//       if (err) {
//         console.log('error in productReviews GET Query')
//         callback(err, null);
//       } else {
//         console.log('success in productReviews GET Query')
//         callback(null, result);
//       }
//     });
//   }
// }