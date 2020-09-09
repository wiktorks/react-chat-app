const mysql = require("mysql");

const registerController = (req, res, next) => {
  const { name, email, password } = req.body;
};

module.exports = registerController;
