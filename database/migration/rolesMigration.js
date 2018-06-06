/** Создание модели ролей */
module.exports = (sequelize, DataTypes) => {
	return sequelize.define('roles', {
			name: DataTypes.STRING,
			name_eng: DataTypes.STRING
		}
	)}