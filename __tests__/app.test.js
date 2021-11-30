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
        expect(result.body.msg).toBe("Bad request: Invalid data provided");
      });
  });

  test("404: valid review_id (number) but no record exists", () => {
    return request(app).get("/api/reviews/28").expect(404);
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
        expect(result.body.msg).toBe("Bad request: Invalid data provided");
      });
  });

  test("400: bad request response sent when given invalid votes to add", () => {
    const votesToAdd = { inc_votes: "number" };
    return request(app)
      .patch("/api/reviews/1")
      .send(votesToAdd)
      .expect(400)
      .then((result) => {
        expect(result.body.msg).toBe("Bad request: Invalid data provided");
      });
  });

  test("404: responds with 404 if no record exists", () => {
    const votesToAdd = { inc_votes: 10 };
    return request(app).patch("/api/reviews/32").send(votesToAdd).expect(404);
  });
});
