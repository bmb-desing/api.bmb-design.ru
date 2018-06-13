const database = require('./database');
const passport = require('./passport');
const logger = require('./logger');
const cache = require('./cache');
const config = {
  database: database,
  passport: passport,
  logger: logger,
  cache: cache
}

module.exports = config