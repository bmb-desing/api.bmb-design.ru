const userSeeder = require('./userSeeder');
const rolesSeeder =  require('./rolesSeeder');
const projectsSeeder = require('./projectsSeeder');
const worksSeeder = require('./worksSeeder');
const reviewSeeder = require('./reviewSeeder');
const newsSeeder = require('./newsSeeder');
const seeder = function(database){
  userSeeder: userSeeder(database)
  rolesSeeder: rolesSeeder(database)
  projectsSeeder: projectsSeeder(database)
  worksSeeder: worksSeeder(database)
  reviewSeeder: reviewSeeder(database)
  newsSeeder: newsSeeder(database)
}
module.exports = seeder