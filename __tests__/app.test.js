const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const { seed } = require("../db/seeds/seed.js");
const app = require("../app");
const request = require("supertest");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("GET api/categories", () => {
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
