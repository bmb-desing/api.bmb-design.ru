module.exports = (sequelize, DataTypes) => {
	return sequelize.define('users_tasks', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		}
	})}