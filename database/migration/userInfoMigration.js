/** Создание модели пользователя */
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('users_info', {
    avatar: {
      type: DataTypes.STRING,
    },
    position: {
      type: DataTypes.STRING,
    },
    shortText: {
      type: DataTypes.TEXT,
    },
    text: DataTypes.TEXT
  },
)}