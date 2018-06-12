const projectRepository = require('../repository/projectRepository');
module.exports = {
  //Получить все
  findAll: function(req, res, next) {
    const page = req.query.page || 1
    projectRepository.getByLimit(page)
      .then(function(projects) {
        res.json(projects)
      })
      .catch(function(err) {
        next(err)
      })
  },
  //Получить по ссылке
  getByAlias: function(req, res, next) {
    const alias = req.params.project
    projectRepository.getByAlias(alias)
      .then(function(project) {
        if(project) {
          res.json(project)
        }
        else {
          res.status(404)
          res.json('Страница не найдена')
        }
      })
      .catch(function(err) {
        next(err)
      })
  },
  //Добавить новый
  addProject: function(req, res, next) {
    projectRepository.addProject({name: req.body.name})
      .then(function(project) {
        res.json('Проект успешно добавлен')
      })
      .catch(function(err) {
        next(err)
      })
  }

}