const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: "localhost",
  dialect: 'mysql',
  time_zone: '+3:00',
  define: {
		charset: 'utf8',
		collate: 'utf8_general_ci',
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
    timezone: '+03:00'
  },
});
const User = sequelize.import('../database/migration/userMigration.js');
const Role = sequelize.import('../database/migration/rolesMigration.js');
const UserRole = sequelize.import('../database/migration/usersRolesMigration.js');
const Projects = sequelize.import('../database/migration/projectsMigration.js');
const Task = sequelize.import('../database/migration/tasksMigration.js');
const UserTask = sequelize.import('../database/migration/tasksUsersMigration.js');
const Works = sequelize.import('../database/migration/worksMigration.js');
const WorksImages = sequelize.import('../database/migration/worksImagesMigration.js');
const WorksSection = sequelize.import('../database/migration/worksSectionMigration.js');
const Usluga = sequelize.import('../database/migration/uslugaMigration.js');
const WorksUsers = sequelize.import('../database/migration/worksUsersMigration.js');
//Связи таблиц

Projects.hasMany(Task);
Task.belongsTo(Projects);
User.belongsToMany(Task, { through: UserTask, as: 'tasks'});
Task.belongsToMany(User, { through: UserTask, as: 'user'});
User.belongsToMany(Role, { through: UserRole, as: 'roles'});
Role.belongsToMany(User, { through: UserRole, as: 'user' });
Works.hasMany(WorksImages);
WorksImages.belongsTo(Works);
Works.belongsToMany(Usluga, { through: WorksSection, as: 'usluga'});
Works.belongsToMany(User, {through: WorksUsers, as: 'user'});
User.belongsToMany(Works, {through: WorksUsers, as: 'works'});
Usluga.belongsToMany(Works, { through: WorksSection, as: 'works'});

const database = {
  sequelize: sequelize,
  user: User,
  role: Role,
  userRoles: UserRole,
  project: Projects,
  task: Task,
  works: Works,
	worksImages: WorksImages,
  usluga: Usluga,
  worksSection: WorksSection
}

module.exports = database