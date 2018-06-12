const user = require('../models/user');
const role = require('../models/roles');

module.exports = {
  //Получение всех пользователей
  getAll: function() {
    return user.findAndCountAll({
      include: {
        model: role,
        as: 'roles',
        through: {
          attributes: [
            'name',
          ]
        }
      }
    })
  },
  //Поиск по любому тегу
  getByTag: function(values) {
    return user.findOne({
      where: values,
      include: {
        model: role,
        as: 'roles',
        through: {
          attributes: [
            'name',
          ]
        }
      }
    })
  },

}