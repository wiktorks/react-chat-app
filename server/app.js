const express = require("express");
const app = express();
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "user",
  password: "password",
  database: "db",
});

connection.connect((e) => {
  if (e) console.log(e);
});

app.use(express.json({ limit: "10kb" }));

app.get("/", (req, res, next) => {
  res.json({ message: "success" });
});

app.get("/users", (req, res, next) => {
  // res.json({ message: "success" });
  connection.query("Show tables", (err, result, fields) => {
    console.log(result);
  });
  res.end();
});

app.listen("3001", () => {
  console.log("App is running on port 3001");
});
