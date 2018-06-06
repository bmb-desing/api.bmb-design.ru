const database = require('./database');
const passport = require('./passport');

const config = {
  database: database,
  passport: passport
}

module.exports = config