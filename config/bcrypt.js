/** Помошник для создания и проверки паролей */
const bcrypt = require('bcrypt');
const saltRounds = 10;
module.exports = {
  //Генерация пароля
  hash(pass) {
    return bcrypt.hashSync(pass, saltRounds);
  },
  //Сравнение пароля
  compare(pass, hash) {
    return bcrypt.compareSync(pass, hash)
  }
}
