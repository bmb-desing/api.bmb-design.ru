const translit = require('transliteration');
module.exports = (sequelize, DataTypes) => {
	return sequelize.define('projects',
		{
			name: {
				type: DataTypes.STRING,
				unique: true
			},
			alias: DataTypes.STRING,
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