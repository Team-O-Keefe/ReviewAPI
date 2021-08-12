
createdb Review;

psql Review;

CREATE TABLE IF NOT EXISTS reviews (
  id SERIAL PRIMARY KEY,
  product_id INT,
  rating INT,
  date INT,
  summary varchar(60),
  body varchar(1000),
  recommend BOOLEAN,
  reported BOOLEAN,
  reviewer_name varchar(60),
  reviewer_email varchar(60),
  response varchar(255),
  helpfulness INT
);

CREATE TABLE IF NOT EXISTS reviewPhoto (
  id INT SERIAL PRIMARY KEY,
  review_id INT NOT NULL REFERENCES reviews(id),
  url varchar(50)
);

CREATE TABLE IF NOT EXISTS characteristics (
  id INT SERIAL PRIMARY KEY,
  product_id INT,
  name varchar(8)
);

CREATE TABLE IF NOT EXISTS characteristicsReviews (
  id INT SERIAL PRIMARY KEY,
  characteristics_id INT NOT NULL REFERENCES characteristics(id),
  review_id INT NOT NULL REFERENCES reviews(id)
);

