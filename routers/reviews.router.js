const express = require("express");
const { getReviewById } = require("../controllers/reviews.controller");

const reviewsRouter = express.Router();

reviewsRouter.route("/:review_id").get(getReviewById);

module.exports = reviewsRouter;
