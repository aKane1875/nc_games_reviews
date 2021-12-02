const db = require("../db/connection");

exports.selectUsers = () => {
  return db.query(`SELECT username FROM users`).then((response) => {
    return response.rows;
  });
};
