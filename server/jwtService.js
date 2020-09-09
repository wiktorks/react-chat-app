const { sign, verify } = require("jsonwebtoken");

module.exports = signJwtLoginToken = (payload) => {
  return sign({userId: payload}, 'sekret do wpisania na później', {expiresIn: '1d'})
}