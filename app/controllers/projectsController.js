const projects = require('../models/project');
module.exports = {

  findAll: function(req, res, next) {
    projects.findAll({
      order: [['date_end', 'ASC']]
    }).then(function(projects) {
      res.json(projects)
    }).catch(function(err) {
      res.status(500)
      res.json(err)
    })
  },

  getByAlias: function(req, res, next) {
    const alias = req.params.project
    projects.findOne({
      where: {
        alias: alias
      }
    }).then(function(project) {
      if(project) {
        res.json(project)
      }
      else {
        res.status(404)
        res.json('Страница не найдена')
      }
    }).catch(function(err) {
      res.status(500)
      res.json(err)
    })
  }

}