const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: "localhost",
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
    timezone: '+03:00'
  },
})
const User = sequelize.import('../database/migration/userMigration.js');
const Role = sequelize.import('../database/migration/rolesMigration.js');
const UserRole = sequelize.import('../database/migration/usersRolesMigration.js');
const Projects = sequelize.import('../database/migration/projectsMigration.js');
const Task = sequelize.import('../database/migration/tasksMigration.js');
//Связи таблиц

Projects.hasMany(Task);
Task.belongsTo(Projects);
User.belongsToMany(Role, { through: UserRole, as: 'roles'});
Role.belongsToMany(User, { through: UserRole, as: 'user' });


const database = {
  sequelize: sequelize,
  user: User,
  role: Role,
  userRoles: UserRole,
  project: Projects,
  task: Task
}

module.exports = database