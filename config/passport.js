const jwtStrategy = require('passport-jwt').Strategy;
const extractJwt = require('passport-jwt').ExtractJwt;
const passport = require("passport");
const secret = process.env.JWT_HASH;
const user = require('../app/models/user');
const role = require('../app/models/roles');
var jwtOptions = {};
const moment = require('moment');

jwtOptions.jwtFromRequest = extractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = secret;

const strategy = new jwtStrategy(jwtOptions, function(jwtCode, done) {
  /** @TODO Проверка на пользователя */
  if (jwtCode) {
    jwtCode.user.password = undefined
    done(null, jwtCode.user)
  }
  else {
    done(true, null)
  }
})
passport.use(strategy)
module.exports = passport