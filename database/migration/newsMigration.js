const translit = require('transliteration');
module.exports = (sequelize, DataTypes) => {
	return sequelize.define('news',
		{
      name: DataTypes.STRING,
      favicon: DataTypes.STRING,
      text: DataTypes.TEXT,
      shortText: DataTypes.TEXT,
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      alias: DataTypes.STRING
		},{
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