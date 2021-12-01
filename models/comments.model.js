const db = require("../db/connection");

exports.selectCommentsByReviewId = (review_id) => {
  return db
    .query(
      `SELECT comment_id, comments.votes, comments.created_at, author, body FROM comments LEFT JOIN users ON comments.author = users.username LEFT JOIN reviews ON comments.review_id = reviews.review_id WHERE reviews.review_id = $1;`,
      [review_id]
    )
    .then((response) => {
      if (response.rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "No comments found for this review",
        });
      } else {
        return response.rows;
      }
    });
};

exports.insertCommentByReviewId = (review_id, username, body) => {
  if (!username || !body) {
    return Promise.reject({
      status: 400,
      msg: "Invalid request, posts need both a body an username",
    });
  }
  return db
    .query(
      `INSERT INTO comments (review_id, author, body) VALUES ($1, $2, $3) RETURNING *`,
      [review_id, username, body]
    )
    .then((response) => {
      return response.rows[0];
    });
};

exports.checkIfCommentExists = (comment_id) => {
  return db
    .query(`SELECT * FROM comments WHERE comment_id = $1`, [comment_id])
    .then((response) => {
      if (response.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Comment not found" });
      }
    });
};

exports.removeCommentById = (comment_id) => {
  return db
    .query(`DELETE FROM comments * WHERE comment_id = $1`, [comment_id])
    .then((response) => {
      return response;
    });
};
