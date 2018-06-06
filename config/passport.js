const jwtStrategy = require('passport-jwt').Strategy;
const extractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');
const passport = require("passport");
const secret = '123';
var jwtOptions = {}
jwtOptions.jwtFromRequest = extractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = secret;
const strategy = new jwtStrategy(jwtOptions, function(jwtCode, next) {
  console.log('payload received', jwtCode);

})

passport.use(strategy)

module.exports = passport