const {
  selectReviewById,
  updateReviewById,
  selectReviews,
  checkIfReviewExists,
} = require("../models/reviews.model");

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

  Promise.all([
    updateReviewById(review_id, inc_votes),
    checkIfReviewExists(review_id),
  ])
    .then((updatedReview) => {
      res.status(200).send({ updatedReview });
    })
    .catch(next);
};

exports.getReviews = (req, res, next) => {
  selectReviews().then((reviews) => {
    console.log(reviews[0]);
    res.status(200).send({ reviews });
  });
};
