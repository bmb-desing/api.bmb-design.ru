module.exports = (sequelize, DataTypes) => {
	return sequelize.define('users_roles', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		}
	})}