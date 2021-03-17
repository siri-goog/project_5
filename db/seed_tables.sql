-- Seed users table
INSERT INTO users(firstname, lastname, email, password)
VALUES ('James', 'Bond', 'james.bond@gmail.com', '3b5fe14857124335bb8832cc602f8edcfa12db42be36b135bef5bca47e3f2b9c');

-- Seed rating table
INSERT INTO ratings(movie_id, user_id, rating)
VALUES (555, 1, 5);