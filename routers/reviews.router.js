const express = require("express");
const {
  getReviewById,
  patchReviewById,
} = require("../controllers/reviews.controller");

const reviewsRouter = express.Router();

reviewsRouter.route("/:review_id").get(getReviewById).patch(patchReviewById);

module.exports = reviewsRouter;
