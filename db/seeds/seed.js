const db = require("../connection");
const format = require("pg-format");

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
        review_id SERIAL PRIMARY KEY,
        title VARCHAR(150),
        review_body TEXT,
        designer VARCHAR(150),
        review_img_url VARCHAR(150) DEFAULT 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
        votes INT DEFAULT 0,
        category VARCHAR REFERENCES categories(slug),
        owner VARCHAR REFERENCES users(username),
        created_at DATE NOT NULL DEFAULT CURRENT_DATE
      )`);
    })
    .then(() => {
      return db.query(`CREATE TABLE comments (
        comment_id SERIAL PRIMARY KEY,
        author VARCHAR REFERENCES users(username),
        review_id INT REFERENCES reviews(review_id),
        votes INT DEFAULT 0,
        created_at DATE,
        body TEXT
      )`);
    })
    .then(() => {
      // 2. insert data
      const formattedUserData = userData.map((user) => {
        return [user.username, user.avatar_url, user.name];
      });
      const queryString = format(
        `INSERT INTO users (username, avatar_url, name) VALUES %L`,
        formattedUserData
      );
      return db.query(queryString);
    })
    .then(() => {
      const formattedCategoryData = categoryData.map((category) => {
        return [category.slug, category.description];
      });
      const queryString = format(
        `INSERT INTO categories (slug, description) VALUES %L`,
        formattedCategoryData
      );
      return db.query(queryString);
    })
    .then(() => {
      const formattedReviewData = reviewData.map((review) => {
        return [
          review.title,
          review.review_body,
          review.designer,
          review.review_img_url,
          review.votes,
          review.category,
          review.owner,
          review.created_at,
        ];
      });
      const queryString = format(
        `INSERT INTO reviews (title, review_body, designer, review_img_url, votes, category, owner, created_at) VALUES %L`,
        formattedReviewData
      );
      return db.query(queryString);
    })
    .then(() => {
      const formattedCommentData = commentData.map((comment) => {
        return [
          comment.author,
          comment.review_id,
          comment.votes,
          comment.created_at,
          comment.body,
        ];
      });
      const queryString = format(
        `INSERT INTO comments (author, review_id, votes, created_at, body) VALUES %L`,
        formattedCommentData
      );
      return db.query(queryString);
    });
  q;
};

module.exports = seed;
