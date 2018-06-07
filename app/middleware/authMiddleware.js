const passport = require('../../config/passport');
const authMiddleware = {
    //Проверка на авторизацию пользователя
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
}
module.exports = authMiddleware