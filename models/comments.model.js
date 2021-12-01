const db = require("../db/connection");

exports.selectCommentsByReviewId = (review_id) => {
  return db
    .query(
      `SELECT comment_id, comments.votes, comments.created_at, author, body FROM comments LEFT JOIN users ON comments.author = users.username LEFT JOIN reviews ON comments.review_id = reviews.review_id WHERE reviews.review_id = $1;`,
      [review_id]
    )
    .then((response) => {
      return response.rows;
    });
};
