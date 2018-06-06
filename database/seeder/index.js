const userSeeder = require('./userSeeder');
const rolesSeeder =  require('./rolesSeeder');
const seeder = function(database){
  userSeeder: userSeeder(database)
  rolesSeeder: rolesSeeder(database)
}
module.exports = seeder