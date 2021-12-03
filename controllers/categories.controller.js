const {
  selectCategories,
  insertCategory,
} = require("../models/categories.model");

exports.getCategories = (req, res, next) => {
  selectCategories()
    .then((categories) => {
      res.status(200).send({ categories });
    })
    .catch(next);
};

exports.postCategory = (req, res, next) => {
  const { slug, description } = req.body;
  insertCategory(slug, description)
    .then((category) => {
      res.status(200).send({ category });
    })
    .catch(next);
};
