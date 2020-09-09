const bcrypt = require("bcrypt");

const hashPassword = (password) =>
  new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) reject(err);
      resolve(hash);
    });
  });

const comparePasswords = (password, hash) =>
  new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, res) => {
      if (err) reject(err);

      if (res) resolve(true);

      resolve(false);
    });
  });

module.exports = {
  comparePasswords,
  hashPassword,
};
