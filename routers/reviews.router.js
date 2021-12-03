const express = require("express");
const {
  getReviewById,
  patchReviewById,
  getReviews,
  postNewReview,
} = require("../controllers/reviews.controller");
const commentsRouter = require("./comments.router");

const reviewsRouter = express.Router();

reviewsRouter.route("/").get(getReviews).post(postNewReview);
reviewsRouter.route("/:review_id").get(getReviewById).patch(patchReviewById);

reviewsRouter.use("/:review_id/comments", commentsRouter);

module.exports = reviewsRouter;
