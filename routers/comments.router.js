const express = require("express");
const {
  getCommentsByReviewId,
  postCommentByReviewId,
} = require("../controllers/comments.controller");
const commentsRouter = express.Router({ mergeParams: true });

commentsRouter
  .route("/")
  .get(getCommentsByReviewId)
  .post(postCommentByReviewId);
module.exports = commentsRouter;
