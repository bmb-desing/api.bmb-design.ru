const database = require('./database');
const passport = require('./passport');
const logger = require('./logger');
const config = {
  database: database,
  passport: passport,
  logger: logger

}

module.exports = config