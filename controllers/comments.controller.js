const {
  selectCommentsByReviewId,
  insertCommentByReviewId,
  checkIfCommentExists,
  removeCommentById,
  updateCommentById,
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

exports.deleteCommentById = (req, res, next) => {
  const { comment_id } = req.params;

  return Promise.all([
    checkIfCommentExists(comment_id),
    removeCommentById(comment_id),
  ])

    .then(([]) => {
      res.status(204).send("deleted");
    })
    .catch(next);
};

exports.patchCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  const { inc_votes } = req.body;
  return Promise.all([
    updateCommentById(comment_id, inc_votes),
    checkIfCommentExists(comment_id),
  ])

    .then(([updatedComment]) => {
      res.status(200).send({ updatedComment });
    })
    .catch(next);
};
