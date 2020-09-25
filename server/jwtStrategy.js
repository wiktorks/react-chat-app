const { Strategy, ExtractJwt } = require("passport-jwt");
const { executeQuery } = require("./database");
const { secret } = require("./jwtService");

const options = {
  secretOrKey: secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  algorithms: ["HS256"],
};

const JWTStrategy = new Strategy(options, async (payload, done) => {
  try {
    const { userId } = payload;
    const userData = executeQuery(
      `SELECT * FROM users WHERE idUser = '${userId}'`
    );
    return userData.length !== 0 ? done(null, userData) : done(null, false);
  } catch (err) {
    return done(err, false);
  }
});

module.exports = { JWTStrategy };
