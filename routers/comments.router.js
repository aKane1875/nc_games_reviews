const express = require("express");
const {
  getCommentsByReviewId,
  postCommentByReviewId,
  deleteCommentById,
} = require("../controllers/comments.controller");
const commentsRouter = express.Router({ mergeParams: true });

commentsRouter
  .route("/")
  .get(getCommentsByReviewId)
  .post(postCommentByReviewId);

commentsRouter.route("/:comment_id").delete(deleteCommentById);

module.exports = commentsRouter;
