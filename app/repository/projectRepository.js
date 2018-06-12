const projects = require('../models/project');

module.exports = {
  //Все проекты
  getAll: function() {
    return projects.findAll({
    });
  },
  
  //Пагинация проектов
  getByLimit: function(page) {
    return projects.findAndCount({
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
  },
  //Добавление проекта
  addProject: function(project) {
    return projects.create(project)
  }

}