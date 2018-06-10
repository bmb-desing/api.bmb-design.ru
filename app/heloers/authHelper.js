const bcrypt = require('../../config/bcrypt');
const secret = process.env.JWT_HASH;
const jwt = require('jsonwebtoken');

module.exports = {
  //Сравнение введеных паролей
  passwordCompare: function(password, hash) {
    return bcrypt.compare(password, hash)
  },
  //Генерация jwt токена
  generateJwt: function(user) {
    return jwt.sign({user}, secret, { algorithm: 'HS256', expiresIn: 60 * 60 * 24 * 7});
  }
}