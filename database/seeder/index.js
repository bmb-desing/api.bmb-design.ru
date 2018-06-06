const userSeeder = require('./userSeeder');
const rolesSeeder =  require('./rolesSeeder');
const projectsSeeder = require('./projectsSeeder');
const seeder = function(database){
  userSeeder: userSeeder(database)
  rolesSeeder: rolesSeeder(database)
  projectsSeeder: projectsSeeder(database)
}
module.exports = seeder