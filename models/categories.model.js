const db = require("../db/connection");

exports.selectCategories = () => {
  return db.query(`SELECT * FROM categories`).then((response) => {
    return response.rows;
  });
};

exports.checkIfCategoryExists = (category) => {
  return db
    .query(`SELECT * FROM categories WHERE slug = $1`, [category])
    .then((response) => {
      if (response.rows.length === 0) {
        return Promise.reject({
          status: 400,
          msg: "Invalid category, must be existing category",
        });
      }
    });
};

exports.insertCategory = (slug, description) => {
  if (!slug || !description) {
    return Promise.reject({
      status: 400,
      msg: "Error: posts require both a slug and description",
    });
  } else if (typeof slug !== "string" || typeof description !== "string") {
    return Promise.reject({
      status: 400,
      msg: "Error: strings only acceptable data type in category posts",
    });
  }
  return db
    .query(
      `INSERT INTO categories (slug, description) VALUES ($1, $2) RETURNING *`,
      [slug, description]
    )
    .then((response) => {
      return response.rows[0];
    });
};
