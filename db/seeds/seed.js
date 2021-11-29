const db = require("../connection");

const seed = (data) => {
  const { categoryData, commentData, reviewData, userData } = data;
  // 1. create tables
  return db
    .query(`DROP TABLE IF EXISTS comments;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS reviews;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS categories;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS users;`);
    })
    .then(() => {
      return db.query(`CREATE TABLE users (
        username VARCHAR(150) PRIMARY KEY UNIQUE,
        avatar_url VARCHAR(250),
        name VARCHAR(150)
      )`);
    })
    .then(() => {
      return db.query(`CREATE TABLE categories (
        slug VARCHAR(150) PRIMARY KEY UNIQUE,
        description VARCHAR(300)
      )`);
    })
    .then(() => {
      return db.query(`CREATE TABLE reviews (
        review_id INT PRIMARY KEY,
        title VARCHAR(150),
        review_body TEXT,
        designer VARCHAR(150),
        review_img_url VARCHAR(150) DEFAULT 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
        votes INT DEFAULT 0,
        category VARCHAR REFERENCES categories(slug),
        owner VARCHAR REFERENCES users(username),
        created_at DATE 
      )`);
    })
    .then(() => {
      return db.query(`CREATE TABLE comments (
        comment_id INT PRIMARY KEY,
        author VARCHAR REFERENCES users(username),
        review_id INT REFERENCES reviews(review_id),
        votes INT DEFAULT 0,
        created_at DATE,
        body TEXT
      )`);
    });

  // 2. insert data
};

module.exports = seed;
