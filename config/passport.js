const jwtStrategy = require('passport-jwt').Strategy;
const extractJwt = require('passport-jwt').ExtractJwt;
const passport = require("passport");
const secret = process.env.JWT_HASH;
const user = require('../app/models/user');
const role = require('../app/models/roles');
var jwtOptions = {}
jwtOptions.jwtFromRequest = extractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = secret;
<<<<<<< HEAD
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
=======
>>>>>>> 662089df56af17c3ade8918d7d22c7fb27fc0bf9



const strategy = new jwtStrategy(jwtOptions, function(jwtCode, done) {
  console.log(user)
  /** @TODO Проверка на пользователя */
  if (jwtCode) {
    console.log(jwtCode)
    if(jwtCode.host = process.env.HOST) {
      user.findOne({
        where: {
          id: jwtCode.id
        },
        include: {
          model: role,
          as: 'Roles',
					through: {
            attributes: [
              'name',
            ]
          }
        }
      }).then(function (user) {

        if(user) {
          done(null, user)
        }
        else {
          done(true, null)
        }
			}).catch(function (err) {
			  console.log(err)
        done(err)
			})
    }
    else {
      done(true, null)
    }
  }
  else {
    done(true, null)
  }
})
passport.use(strategy)
module.exports = passport