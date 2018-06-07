const passport = require('../../config/passport');
const authMiddleware = {
    noAuth: function(req, res, next) {
        if(req.headers.authenticate) {
            res.status(403)
            res.json('У вас нет прав для просмотра этой страницы')
        }
    },
    isAuth: function (req, res, next) {
        passport.authenticate('jwt', function (err, user) {
            if (err || !user) {
                res.json({error: true, message: 'Вы не авторизированны, пожалуйста авторизируйтесь'})
            }
            else {
                req.user = user
                next()
            }

        })(req, res, next)
    },
    nextPage: function (req, res, next) {
        res.json(req.user)
    }
}
module.exports = authMiddleware