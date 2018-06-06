const passport = require('../../config/passport');
const authMiddleware = {
    isAuth: function (req, res, next) {
        passport.authenticate('jwt', function (err, user) {
            if (err) {
                var error = new Error('Не авторизирован')
                error.status = 401
                next(error)
            }
            else if(!user) {
                var error = new Error('Не авторизирован')
                error.status = 401
                next(error)
            }
            else {
                req.user = user
                next()
            }

        })(req, res, next)
    },
    //isAuth: passport.authenticate('jwt', {session: false}),
    nextPage: function (req, res, next) {
        res.json(req.user)
    }
}
module.exports = authMiddleware