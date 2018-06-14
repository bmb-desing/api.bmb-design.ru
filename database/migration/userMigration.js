/** Создание модели пользователя */
const bcrypt = require('../../config/bcrypt');
const translit = require('transliteration');
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('users', {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      unique: true,
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    alias: {
      type: DataTypes.STRING
    }
  },
  {
    hooks: {
      beforeCreate: (user) => {
        user.password = bcrypt.hash(user.password)
        user.alias = translit.slugify(user.first_name + ' ' + user.last_name)
      },
    }
  }
)}