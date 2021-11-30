const express = require("express");
const { getCommentsByReviewId } = require("../controllers/comments.controller");
const commentsRouter = express.Router({ mergeParams: true });

commentsRouter.route("/").get(getCommentsByReviewId);
module.exports = commentsRouter;
