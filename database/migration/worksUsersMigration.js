module.exports = (sequelize, DataTypes) => {
	return sequelize.define('works_users', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		}
	})}