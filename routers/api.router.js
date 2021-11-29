const express = require("express");
const categoriesRouter = require("./categories.router");

const apiRouter = express.Router();

apiRouter.use("/categories", categoriesRouter);

module.exports = apiRouter;
