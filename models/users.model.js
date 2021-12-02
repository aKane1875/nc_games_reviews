const db = require("../db/connection");

exports.selectUsers = () => {
  return db.query(`SELECT username FROM users`).then((response) => {
    return response.rows;
  });
};

exports.selectUserByUsername = (username) => {
  return db
    .query(`SELECT * FROM users WHERE username = $1`, [username])
    .then((response) => {
      if (response.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "No such username found" });
      }
      return response.rows[0];
    });
};
