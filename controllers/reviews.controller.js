const { selectReviewById } = require("../models/reviews.model");

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
