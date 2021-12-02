const { selectRoutes } = require("../models/api.model");

exports.getRoutes = (req, res, next) => {
  selectRoutes()
    .then((routes) => {
      res.status(200).send({ routes });
    })
    .catch(next);
};
