const express = require("express");
const { handlePSQL400Errors, handle500Errors } = require("./errors/errors");
const apiRouter = require("./routers/api.router");

const app = express();

app.use(express.json());

app.use("/api", apiRouter);

app.use(handlePSQL400Errors);
app.use(handle500Errors);

module.exports = app;
