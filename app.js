const express = require("express");
const { handleCustomErrors, handle500Errors } = require("./errors/errors");
const apiRouter = require("./routers/api.router");

const app = express();

app.use(express.json());

app.use("/api", apiRouter);

app.use(handleCustomErrors);
app.use(handle500Errors);

module.exports = app;
