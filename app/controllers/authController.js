const userRepository = require('../repository/userRepository');
const authHelpers = require('../heloers/authHelper');
module.exports = {
  //Авторизация
  loginPost: function(req, res, next) {
    userRepository.getByTag({email:  req.body.email})
    .then(function(user) {
      if(user) {
        const comparePass = authHelpers.passwordCompare(req.body.password, user.password)
        if(comparePass) {
          user.password = undefined
          const token = authHelpers.generateJwt(user);
          res.json({
            token: token,
            user: user
          })
        }
        else {
          res.status(400)
          res.json('Не верно указан пароль')
        } 
      }
      else {
        res.status(400)
        res.json('Пользователь не найден')
      }
    }).catch(function(err) {
      next(err)

    })
  },
  //Отдать пользователя
  getUser: function (req, res, next) {
    res.json(req.user)
	}
}