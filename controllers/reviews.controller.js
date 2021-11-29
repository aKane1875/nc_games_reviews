const {
  selectReviewById,
  updateReviewById,
} = require("../models/reviews.model");

exports.getReviewById = (req, res, next) => {
  const { review_id } = req.params;
  selectReviewById(review_id)
    .then((review) => {
      if (review === undefined) {
        next();
      } else {
        res.status(200).send({ review });
      }
    })
    .catch(next);
};

exports.patchReviewById = (req, res, next) => {
  const { review_id } = req.params;
  const { inc_votes } = req.body;
  updateReviewById(review_id, inc_votes).then((updatedReview) => {
    res.status(200).send({ updatedReview });
  });
};
