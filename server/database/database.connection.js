const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "volvoxc70",
  database: "db",
});

module.exports = connection;
