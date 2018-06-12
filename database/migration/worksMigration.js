const translit = require('transliteration');
module.exports = (sequelize, DataTypes) => {
	return sequelize.define('works', {
		title: {
			type: DataTypes.STRING,
		},
		description: {
			type: DataTypes.TEXT,
		},
		name: {
			type: DataTypes.STRING,
		},
		alias: {
			type: DataTypes.STRING,
		},
		thumbnail: {
			type: DataTypes.STRING,
		},
		text: {
			type: DataTypes.TEXT,
		}
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