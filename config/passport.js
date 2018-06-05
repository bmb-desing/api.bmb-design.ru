const jwtStrategy = require('passport-jwt').Strategy;
const extractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');
const passport = require("passport");
const secret = '123';
var jwtOptions = {}
jwtOptions.jwtFromRequest = extractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = secret;
const strategy = new jwtStrategy(jwtOptions, function(jwtCode, next) {
	if(jwtCode) {
		const user = 1
		next(null, user)
	}
	else {
		var err = new Error('Не авторизирован');
		err.status = 401
		next(err, null)
	}

})

passport.use(strategy)

module.exports = passport