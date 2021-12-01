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
  const ROUTES = {
    "GET /api": {
      description:
        "serves up a json representation of all the available endpoints of the api",
    },
    "GET /api/categories": {
      description: "serves an array of all categories",
      queries: [],
      exampleResponse: {
        categories: [
          {
            description: "Players attempt to uncover each other's hidden role",
            slug: "Social deduction",
          },
        ],
      },
    },
    "GET /api/reviews": {
      description: "serves an array of all reviews",
      queries: ["category", "sort_by", "order"],
      exampleResponse: {
        reviews: [
          {
            title: "One Night Ultimate Werewolf",
            designer: "Akihisa Okui",
            owner: "happyamy2016",
            review_img_url:
              "https://images.pexels.com/photos/5350049/pexels-photo-5350049.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
            category: "hidden-roles",
            created_at: 1610964101251,
            votes: 5,
          },
        ],
      },
    },
    "GET /api/reviews/:review_id": {
      description: "serves a review object with a count of comments added",
      queries: [],
      exampleResponse: {
        review: {
          owner: "mallionaire",
          title: "Agricola",
          review_id: 1,
          review_body: "Farmyard fun!",
          designer: "Uwe Rosenberg",
          review_img_url:
            "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
          category: "euro game",
          created_at: "2021-01-18T00:00:00.000Z",
          votes: 1,
          comment_count: "0",
        },
      },
    },
    "GET /api/reviews/:review_id/comments": {
      description: "serves an array of comments relating to a specific review",
      queries: [],
      exampleResponse: {
        comments: [
          {
            comment_id: 2,
            votes: 13,
            created_at: "2021-01-18T00:00:00.000Z",
            author: "mallionaire",
            body: "My dog loved this game too!",
          },
          {
            comment_id: 3,
            votes: 10,
            created_at: "2021-01-18T00:00:00.000Z",
            author: "philippaclaire9",
            body: "I didn't know dogs could play games",
          },
          {
            comment_id: 6,
            votes: 10,
            created_at: "2021-03-27T00:00:00.000Z",
            author: "philippaclaire9",
            body: "Not sure about dogs, but my cat likes to get involved with board games, the boxes are their particular favourite",
          },
        ],
      },
    },
    "PATCH /api/reviews/:review_id": {
      description:
        "Updates an existing review by adding or removing votes as needed, serves an updated review object",
      requests: { inc_votes: "Number" },
      exampleResponse: {
        updatedReview: {
          review_id: 1,
          title: "Agricola",
          review_body: "Farmyard fun!",
          designer: "Uwe Rosenberg",
          review_img_url:
            "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
          votes: 11,
          category: "euro game",
          owner: "mallionaire",
          created_at: "2021-01-18T00:00:00.000Z",
        },
      },
    },
    "POST /api/reviews/:review_id/comments": {
      description:
        "Posts a new comment to the database and serves the posted comment",
      requests: { username: "your username", body: "comment content" },
      expectedResponse: {
        updatedReview: {
          review_id: 1,
          title: "Agricola",
          review_body: "Farmyard fun!",
          designer: "Uwe Rosenberg",
          review_img_url:
            "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
          votes: 11,
          category: "euro game",
          owner: "mallionaire",
          created_at: "2021-01-18T00:00:00.000Z",
        },
      },
    },
    "DELETE /api/comments/:comment_id": {
      description:
        "Deletes a given comment by the comment_id and serves a 204 status code, no content",
    },
  };

  res.status(200).send({ ROUTES });
});

module.exports = apiRouter;
