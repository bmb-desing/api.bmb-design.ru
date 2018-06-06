
module.exports = (sequelize, DataTypes) => {
	return sequelize.define('tasks',
		{
			title: DataTypes.STRING,
			status: {
				type: DataTypes.ENUM,
				values: [
					'waiting',
					'work',
					'ready',
					'approved'
				],
				defaultValue: 'waiting'
			},
			text: DataTypes.TEXT
		}
	)}