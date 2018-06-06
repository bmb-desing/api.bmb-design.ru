
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
					'approved',
					'fail'
				],
				defaultValue: 'waiting'
			},
			date_end: DataTypes.DATE,
			text: DataTypes.TEXT
		}
	)}