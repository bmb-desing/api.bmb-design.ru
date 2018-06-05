const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: "localhost",
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
})
const database = {
  sequelize: sequelize,
  user: sequelize.import('../database/migration/userMigration.js'),
}
module.exports = database