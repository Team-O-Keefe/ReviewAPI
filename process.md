 [x] - set up Schemas
 [x] - load schemas into postgresql
 [x] - load csv data into schema
        -Data is loaded into pg admin
        -Data is loaded into terminal psql

 [x] - set up server to talk to pgadmin
        - only using pgadmin for testing

   ENDPOINTS
  [x]   -GET /reviews query: product_id, page, count, sort
  [x]   -GET /reviews/meta  query: product_id

  []   -POST /reviews params: product_id, rating, summary, body, recommend, name, email, photos, characteristics

  [x]   -PUT /reviews/:review_id/helpful params: review_id (increases  value)


   [] - move queries to model controller framework
