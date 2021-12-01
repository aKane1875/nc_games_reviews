const express = require("express");
const categoriesRouter = require("./categories.router");
const reviewsRouter = require("./reviews.router");
const commentsRouter = require("./comments.router");
const { response } = require("express");

const apiRouter = express.Router();

apiRouter.use("/categories", categoriesRouter);
apiRouter.use("/reviews", reviewsRouter);
apiRouter.use("/comments", commentsRouter);

apiRouter.route("/").get((req, res, next) => {
  const paths = {
    "GET /api/categories": "Responds with an array of category objects",
    "GET /api/reviews/:review_id":
      "Responds with a specific review object selected by review_id with a count of all comments added",
    "PATCH /api/reviews/:review_id":
      "Updates number of votes a review. Request body accepts an object in the form { inc_votes: newVote }, newVote indicates how much to update votes by",
    "GET /api/reviews":
      "Responds with array of review objects, can accept sort_by queries to reorganise, can select ASC or DESC order and can filter search by using a category query",
    "GET /api/reviews/:review_id/comments":
      "Responds with an array of comments for a specific review selected by review_id",
    "POST /api/reviews/:review_id/comments":
      "Post new comments, request body requires {username, body}, responds with the posted comment",
    "DELETE /api/comments/:comment_id":
      "Deletes a specific comment based on comment_id",
    "GET /api": "Responds with the JSON you are currently reading",
  };
  res.status(200).send({ paths });
});

module.exports = apiRouter;
