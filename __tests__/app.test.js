const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const app = require("../app");
const request = require("supertest");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("GET /api/categories", () => {
  test("200: responds with an object with a key of categories and a value of an array of category objects", () => {
    return request(app)
      .get("/api/categories")
      .expect(200)
      .then((result) => {
        expect(result.body.categories).toBeInstanceOf(Array);
        expect(result.body.categories).toHaveLength(4);
        result.body.categories.forEach((category) => {
          expect(category).toEqual(
            expect.objectContaining({
              slug: expect.any(String),
              description: expect.any(String),
            })
          );
        });
      });
  });

  test("404: path not found", () => {
    return request(app).get("/api/category").expect(404);
  });
});

describe("GET /api/reviews/:review_id", () => {
  test("200: responds with a review object with required properties", () => {
    return request(app)
      .get("/api/reviews/1")
      .expect(200)
      .then((result) => {
        expect(result.body.review).toEqual(
          expect.objectContaining({
            owner: expect.any(String),
            title: expect.any(String),
            review_id: expect.any(Number),
            review_body: expect.any(String),
            designer: expect.any(String),
            review_img_url: expect.any(String),
            category: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            comment_count: expect.any(String),
          })
        );
      });
  });

  test("400: responds with a bad request message when given invalid review_id", () => {
    return request(app)
      .get("/api/reviews/hibernianfootballclub")
      .expect(400)
      .then((result) => {
        expect(result.body.msg).toBe(
          "Invalid request, review ID must be a number"
        );
      });
  });

  test("404: valid review_id (number) but no record exists", () => {
    return request(app)
      .get("/api/reviews/28")
      .expect(404)
      .then((result) => {
        expect(result.body.msg).toBe("No review found");
      });
  });
});

describe("PATCH /api/reviews/:review_id", () => {
  test("200: increments votes when given a positive number and returns updated review", () => {
    const votesToAdd = { inc_votes: 10 };
    return request(app)
      .patch("/api/reviews/1")
      .send(votesToAdd)
      .expect(200)
      .then((result) => {
        expect(result.body.updatedReview.votes).toBe(11);
        expect(result.body.updatedReview).toEqual(
          expect.objectContaining({
            review_id: expect.any(Number),
            title: expect.any(String),
            review_body: expect.any(String),
            designer: expect.any(String),
            review_img_url: expect.any(String),
            votes: expect.any(Number),
            category: expect.any(String),
            owner: expect.any(String),
            created_at: expect.any(String),
          })
        );
      });
  });

  test("200: decrements votes when given a negative number and returns updated review", () => {
    const votesToAdd = { inc_votes: -10 };
    return request(app)
      .patch("/api/reviews/1")
      .send(votesToAdd)
      .expect(200)
      .then((result) => {
        expect(result.body.updatedReview.votes).toBe(-9);
      });
  });

  test("400: bad request response sent when given invalid ID", () => {
    const votesToAdd = { inc_votes: -10 };
    return request(app)
      .patch("/api/reviews/batman")
      .send(votesToAdd)
      .expect(400)
      .then((result) => {
        expect(result.body.msg).toBe(
          "Invalid request, review ID must be a number"
        );
      });
  });

  test("400: bad request response sent when given invalid votes to add", () => {
    const votesToAdd = { inc_votes: "number" };
    return request(app)
      .patch("/api/reviews/1")
      .send(votesToAdd)
      .expect(400)
      .then((result) => {
        expect(result.body.msg).toBe(
          "Invalid request, inc_votes must be a number"
        );
      });
  });

  test("404: responds with 404 if no record exists", () => {
    const votesToAdd = { inc_votes: 10 };
    return request(app)
      .patch("/api/reviews/32")
      .send(votesToAdd)
      .expect(404)
      .then((result) => {
        expect(result.body.msg).toBe("Review not found");
      });
  });
});

describe("GET /api/reviews", () => {
  test("200: responds with an array of reviews with required properties", () => {
    return request(app)
      .get("/api/reviews")
      .expect(200)
      .then((result) => {
        expect(result.body.reviews).toBeInstanceOf(Array);
        expect(result.body.reviews).toHaveLength(13);
        expect(result.body.reviews[0]).toEqual(
          expect.objectContaining({
            owner: expect.any(String),
            title: expect.any(String),
            review_id: expect.any(Number),
            category: expect.any(String),
            review_img_url: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            comment_count: expect.any(String),
          })
        );
      });
  });

  test("404: path not found", () => {
    return request(app).get("/api/category").expect(404);
  });

  test("200: returned array sorted by query, returns in descending date order by default", () => {
    return request(app)
      .get("/api/reviews")
      .expect(200)
      .then((result) => {
        expect(result.body.reviews).toBeSortedBy("created_at", {
          descending: true,
        });
      });
  });

  test("200: returned array sorted by query, returns in order of query", () => {
    return request(app)
      .get("/api/reviews?sort_by=comment_count")
      .expect(200)
      .then((result) => {
        expect(result.body.reviews).toBeSortedBy("comment_count", {
          descending: true,
        });
      });
  });

  test("400: responds with message to inform user of invalid query", () => {
    return request(app)
      .get("/api/reviews?sort_by=pennywise")
      .expect(400)
      .then((result) => {
        expect(result.body.msg).toBe("Invalid query, no such column");
      });
  });

  test("200: returned array can be sorted in asc order if requested", () => {
    return request(app)
      .get("/api/reviews?order=asc")
      .expect(200)
      .then((result) => {
        expect(result.body.reviews).toBeSortedBy("created_at", {
          descending: false,
        });
      });
  });

  test("400: responds with message to inform user of order selection", () => {
    return request(app)
      .get("/api/reviews?order=largeToSmall")
      .expect(400)
      .then((result) => {
        expect(result.body.msg).toBe(
          "Invalid order selection, asc or desc only"
        );
      });
  });

  test("200: can filter reviews by category", () => {
    return request(app)
      .get("/api/reviews?category=dexterity")
      .expect(200)
      .then((result) => {
        expect(result.body.reviews).toHaveLength(1);
      });
  });
  test("400: Invalid category selected", () => {
    return request(app)
      .get("/api/reviews?category=shootingStuff")
      .expect(404)
      .then((result) => {
        expect(result.body.msg).toBe("Category not found");
      });
  });
});

describe("GET /api/reviews/:review_id/comments", () => {
  test.only("200: responds with an array of comments for a specific review ID", () => {
    return request(app)
      .get("/api/reviews/3/comments")
      .expect(200)
      .then((result) => {
        console.log(result.body);
        expect(result.body.comments).toBeInstanceOf(Array);
        result.body.comments.forEach((comment) => {
          expect(comment).toEqual(
            expect.objectContaining({
              comment_id: expect.any(Number),
              votes: expect.any(Number),
              created_at: expect.any(String),
              author: expect.any(String),
              body: expect.any(String),
            })
          );
        });
      });
  });
});
