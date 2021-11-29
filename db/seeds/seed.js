const db = require("../connection");

const seed = (data) => {
  const { categoryData, commentData, reviewData, userData } = data;
  // 1. create tables
  return db.query(`CREATE TABLE users (
    username VARCHAR(150) PRIMARY KEY UNIQUE,
    avatar_url VARCHAR(250),
    name VARCHAR(150)
  )`);
  // 2. insert data
};

module.exports = seed;
