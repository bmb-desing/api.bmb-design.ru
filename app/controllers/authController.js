const user = require('../models/user');
const bcrypt = require('../../helpers/bcrypt');
const secret = '123';

const jwt = require('jsonwebtoken');
const authController = {
  //Авторизация
  loginPost: function(req, res, next) {
    authController.findUser(req.body.email, function(error, user) {
      if(error) {
        var err = new Error(error.message)
        err.status = error.status
        next(err)
        //res.status(error.status).json(error.message)
      }
      else {
        authController.passwordCompare(req.body.password, user.password, function(error, status) {
          if (error) {
            var err = new Error(error.message)
            err.status = error.status
            next(err)
          }
          else {
            const token = jwt.sign(JSON.stringify({
              id: user.id,
              first_name: user.first_name
            }), secret)
            res.json({
              token: token,
              user: user
            })
          }
        })
      }
    })
  },
  //Проверка на наличие такого пользователя
  findUser: function(email, callback) {
    user.findOne({
      where: {
        email: email
      }
    }).then(function(user) {
      if(user) {
        callback(null, user)
      }
      else {
        callback({
          status: 401,
          message: 'Пользователь не найден'
        })
      }
    }).catch(function(err) {
      console.log(err)
      callback({
        status: 500,
        message: err
      })
    })
  },
  //Сравнение паролей пользователя
  passwordCompare: function(password, compare, callback) {
    const passIdentify = bcrypt.compare(password, compare)
    if(passIdentify) {
      callback(null, true)
    }
    else {
      callback({
        status: 401,
        message: 'Пароли не совпадают'
      })
    }
  }
}
module.exports = authController