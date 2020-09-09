const connection = require("./database.connection");

const executeQuery = (query) =>
  new Promise((resolve, reject) => {
    connection.query(query, (err, result, fields) => {
      if (err) reject(err);
      resolve(result);
    });
  });

module.exports = executeQuery;
