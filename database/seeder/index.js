const userSeeder = require('./userSeeder');
const seeder = function(database){
  userSeeder: userSeeder(database.user)
}
module.exports = seeder