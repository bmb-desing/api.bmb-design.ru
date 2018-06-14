module.exports = (sequelize, DataTypes) => {
	return sequelize.define('review',
		{
      text: DataTypes.TEXT,
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
      },
      image: DataTypes.STRING,
      email: DataTypes.STRING,
      name: DataTypes.STRING,
      video: DataTypes.STRING,
      document: DataTypes.STRING
		}
	)}