/** Создание модели пользователя */
const bcrypt = require('../../config/bcrypt');
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
  },
  {
    hooks: {
      beforeCreate: (user) => {
        user.password = bcrypt.hash(user.password)
      },
    }
  }
)}