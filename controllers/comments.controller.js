const {
  selectCommentsByReviewId,
  insertCommentByReviewId,
} = require("../models/comments.model");
const { checkIfReviewExists } = require("../models/reviews.model");

exports.getCommentsByReviewId = (req, res, next) => {
  const { review_id } = req.params;
  selectCommentsByReviewId(review_id)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch(next);
};

exports.postCommentByReviewId = (req, res, next) => {
  const { review_id } = req.params;
  const { username, body } = req.body;

  return Promise.all([
    checkIfReviewExists(review_id),
    insertCommentByReviewId(review_id, username, body),
  ])
    .then(([, newComment]) => {
      res.status(201).send({ newComment });
    })
    .catch(next);
};
