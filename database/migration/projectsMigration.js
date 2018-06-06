const translit = require('transliteration');
module.exports = (sequelize, DataTypes) => {
	return sequelize.define('projects',
		{
			name: DataTypes.STRING,
			alias: DataTypes.STRING,
			date_end: DataTypes.DATE,
		},
		{
			hooks: {
				beforeCreate: (project) => {
					return project.alias = translit.slugify(project.name)
				},
				beforeUpdate: (project) => {
					return project.alias = translit.slugify(project.name)
				}
			}
		}
	)}