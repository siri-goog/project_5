DROP TABLE IF EXISTS ratings;
DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users (
  user_id serial PRIMARY KEY UNIQUE,
  firstname VARCHAR(50) NOT NULL,
  lastname VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS ratings (
  rating_id serial PRIMARY KEY UNIQUE,
  movie_id INT NOT NULL,
  user_id INT REFERENCES users(user_id),
  rating SMALLINT NOT NULL CHECK (rating >= 1 AND rating <= 5)
);