const db = require("../db/connection");

exports.selectCommentsByReviewId = (review_id, limit = null, p = 0) => {
  if (isNaN(limit) && limit !== null) {
    return Promise.reject({
      status: 400,
      msg: "Invalid limit input, must be a number",
    });
  }
  if (isNaN(p)) {
    return Promise.reject({
      status: 400,
      msg: "Invalid p query, must be a number",
    });
  } else if (p > 0) {
    p = (p - 1) * limit;
  }
  return db
    .query(
      `SELECT comment_id, comments.votes, comments.created_at, author, body FROM comments LEFT JOIN users ON comments.author = users.username LEFT JOIN reviews ON comments.review_id = reviews.review_id WHERE reviews.review_id = $1 LIMIT $2 OFFSET $3;`,
      [review_id, limit, p]
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

exports.updateCommentById = (comment_id, inc_votes) => {
  if (inc_votes && isNaN(inc_votes)) {
    return Promise.reject({
      status: 400,
      msg: "Invalid request, inc_votes must be a number",
    });
  }
  return db
    .query(`UPDATE comments SET votes = votes + $2 WHERE comment_id = $1`, [
      comment_id,
      inc_votes,
    ])
    .then(() => {
      return db.query(`SELECT * FROM comments WHERE comment_id = $1`, [
        comment_id,
      ]);
    })
    .then((response) => {
      return response.rows[0];
    });
};
