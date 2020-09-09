const strategy = require("passport-jwt").Strategy;
const jwtExtact = require("passport-jwt").ExtractJwt;

const options = {
  secretOrKey: APP_CONFIG.JWT_LOGIN_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  algorithms: ["HS256"],
};

export const JWTStrategy = new strategy(options, (payload, done) => {
  console.log("to be done");
});
