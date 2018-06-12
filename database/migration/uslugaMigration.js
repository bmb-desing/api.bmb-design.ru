module.exports = (sequelize, DataTypes) => {
	return sequelize.define('uslugas', {
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		title: DataTypes.STRING,
		description: DataTypes.STRING,
		text: DataTypes.TEXT,
		favicon: DataTypes.STRING,
		alias: {
			type: DataTypes.STRING,
			allowNull: false
		},
	}
)}