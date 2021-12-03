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
