const userSeeder = require('./userSeeder');
const rolesSeeder =  require('./rolesSeeder');
const projectsSeeder = require('./projectsSeeder');
const worksSeeder = require('./worksSeeder')
const seeder = function(database){
  userSeeder: userSeeder(database)
  rolesSeeder: rolesSeeder(database)
  projectsSeeder: projectsSeeder(database)
  worksSeeder: worksSeeder(database)
}
module.exports = seeder