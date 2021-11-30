const db = require("../db/connection");

exports.selectReviewById = (review_id) => {
  return db
    .query(
      `SELECT owner, title, reviews.review_id, review_body, designer, review_img_url, category, reviews.created_at, reviews.votes, COUNT(comments.review_id = reviews.review_id) AS comment_count FROM reviews LEFT JOIN comments ON reviews.review_id = comments.review_id LEFT JOIN users ON reviews.owner = users.username WHERE reviews.review_id = $1 GROUP BY reviews.review_id`,
      [review_id]
    )
    .then((response) => {
      if (response.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "No review found" });
      } else {
        return response.rows[0];
      }
    });
};

exports.updateReviewById = (review_id, inc_votes) => {
  if (inc_votes && isNaN(inc_votes)) {
    return Promise.reject({
      status: 400,
      msg: "Invalid request, inc_votes must be a number",
    });
  }
  return db
    .query(`UPDATE reviews SET votes = votes + $2 WHERE review_id = $1`, [
      review_id,
      inc_votes,
    ])
    .then(() => {
      return db.query(`SELECT * FROM reviews WHERE review_id = $1`, [
        review_id,
      ]);
    })
    .then((response) => {
      if (response.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Review not found" });
      } else {
        return response.rows[0];
      }
    });
};

exports.selectReviews = (sort_by = "reviews.created_at") => {
  console.log(sort_by);
  if (
    ![
      "owner",
      "title",
      "reviews.review_id",
      "category",
      "review_img_url",
      "reviews.created_at",
      "reviews.votes",
      "comment_count",
    ].includes(sort_by)
  ) {
    return Promise.reject({
      status: 400,
      msg: "Invalid query, no such column",
    });
  } else {
    return db
      .query(
        `SELECT owner, title, reviews.review_id, category, review_img_url, reviews.created_at, reviews.votes, COUNT(comments.review_id = reviews.review_id) AS comment_count FROM reviews LEFT JOIN comments ON reviews.review_id = comments.review_id LEFT JOIN users ON reviews.owner = users.username GROUP BY reviews.review_id ORDER BY ${sort_by} ASC`
      )
      .then((response) => {
        console.log(response.rows);
        return response.rows;
      });
  }
};

exports.checkIfReviewExists = (review_id) => {
  return db
    .query(`SELECT * FROM reviews WHERE review_id = $1`, [review_id])
    .then((response) => {
      if (response.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Review not found" });
      }
    });
};
