const db = require('../../config/database');

module.exports = {
  user: db.user,
  info: db.userInfo,
  roles: db.userRoles,
  works: db.works
};