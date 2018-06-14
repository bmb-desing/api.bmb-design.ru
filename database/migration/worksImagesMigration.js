module.exports = (sequelize, DataTypes) => {
	return sequelize.define('works_image', {
		image: {
			type: DataTypes.STRING,
			allowNull: false
		},
		alt: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}
)}