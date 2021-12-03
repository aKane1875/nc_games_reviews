const {
  selectReviewById,
  updateReviewById,
  selectReviews,
  checkIfReviewExists,
  insertNewReview,
  removeReviewById,
} = require("../models/reviews.model");

const { checkIfUserExists } = require("../models/users.model");
const { checkIfCategoryExists } = require("../models/categories.model");

exports.getReviewById = (req, res, next) => {
  const { review_id } = req.params;
  return Promise.all([
    selectReviewById(review_id),
    checkIfReviewExists(review_id),
  ])
    .then(([review]) => {
      res.status(200).send({ review });
    })
    .catch(next);
};

exports.patchReviewById = (req, res, next) => {
  const { review_id } = req.params;
  const { inc_votes } = req.body;

  return Promise.all([
    updateReviewById(review_id, inc_votes),
    checkIfReviewExists(review_id),
  ])
    .then(([updatedReview]) => {
      res.status(200).send({ updatedReview });
    })
    .catch(next);
};

exports.getReviews = (req, res, next) => {
  const { sort_by, order, category, limit, p } = req.query;
  selectReviews(sort_by, order, category, limit, p)
    .then((reviews) => {
      res.status(200).send({ total_count: reviews.length, reviews });
    })
    .catch(next);
};

exports.postNewReview = (req, res, next) => {
  const { owner, title, review_body, designer, category } = req.body;
  return Promise.all([
    checkIfUserExists(owner),
    checkIfCategoryExists(category),
    insertNewReview(owner, title, review_body, designer, category),
  ])
    .then(([, , review]) => {
      res.status(200).send({ review });
    })
    .catch(next);
};

exports.deleteReviewById = (req, res, next) => {
  const { review_id } = req.params;
  return Promise.all([
    checkIfReviewExists(review_id),
    removeReviewById(review_id),
  ])
    .then(([]) => {
      res.status(204).send("review deleted");
    })
    .catch(next);
};
