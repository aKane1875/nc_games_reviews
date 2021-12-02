const fs = require("fs/promises");

exports.selectRoutes = () => {
  return fs
    .readFile(`${__dirname}/../endpoints.json`, "utf8", (err, response) => {
      console.log(response);
      if (err) {
        return Promise.reject({ status: 400, msg: "Incorrect path to api" });
      }
    })
    .then((response) => {
      const routesJSON = JSON.parse(response);
      return routesJSON;
    });
};
