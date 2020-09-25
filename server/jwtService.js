const { sign } = require("jsonwebtoken");
const secret = "sekret do wpisania na później";

const signJwtLoginToken = (payload) => {
  return sign({ userId: payload }, "sekret do wpisania na później", {
    expiresIn: "1d",
  });
};

module.exports = { secret, signJwtLoginToken };
