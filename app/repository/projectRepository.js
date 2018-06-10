const projects = require('../models/project');

module.exports = {
  //Все проекты
  getAll: function() {
    return projects.findAll({
      order: [['date_end', 'ASC']]
    });
  },
  
  //Пагинация проектов
  getByLimit: function(page) {
    return projects.findAndCount({
      order: [['date_end', 'ASC']],
      limit: 20,
      offset: 20 * (page - 1)
    })
  },

  //Поиск по alias
  getByAlias: function(alias) {
    return projects.findOne({
      where: {
        allias : alias
      }
    })
  }
}