const projectRepository = require('../repository/projectRepository');
module.exports = {
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
  }

}