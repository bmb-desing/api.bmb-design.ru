module.exports = (sequelize, DataTypes) => {
	return sequelize.define('works_uslugas', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		}
})}