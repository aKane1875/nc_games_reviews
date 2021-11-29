const express = require("express");
const { handle400Errors, handle500Errors } = require("./errors/errors");
const apiRouter = require("./routers/api.router");

const app = express();

app.use(express.json());

app.use("/api", apiRouter);

app.use(handle400Errors);
app.use(handle500Errors);

module.exports = app;
