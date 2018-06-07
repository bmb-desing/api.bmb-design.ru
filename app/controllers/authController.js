const user = require('../models/user');
const role = require('../models/roles');
const bcrypt = require('../../helpers/bcrypt');
const moment = require('moment');
const secret = process.env.JWT_HASH;

const jwt = require('jsonwebtoken');
const authController = {
  //Авторизация
  loginPost: function(req, res, next) {
    authController.findUser(req.body.email, function(error, user) {
      if(error) {
        res.json({error: true, message: error.message})
      }
      else {
        authController.passwordCompare(req.body.password, user.password, function(error, status) {
          if (error) {
						res.json({error: true, message: error.message})
          }
          else {
            user.password = undefined
            const token = jwt.sign({user}, secret, { algorithm: 'HS256', expiresIn: 60 * 60 * 24 * 7});
            user.password = undefined
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
      },
      include: {
        model: role,
        as: 'roles',
        through: {
          attributes: [
            'name',
          ]
        }
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
  },
  //Отдать пользователя
  getUser: function (req, res, next) {
    res.json(req.user)
	}
}
module.exports = authController