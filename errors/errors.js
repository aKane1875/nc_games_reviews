exports.handle400Errors = (err, req, res, next) => {
  if ((err.code = "22P02")) {
    res.status(400).send({ msg: "Bad request: Invalid data provided" });
  } else {
    next(err);
  }
};

exports.handle500Errors = (err, req, res, next) => {
  res.status(500).send({ msg: "CUSTOM INTERNAL SERVER ERROR MESSAGE" });
};
