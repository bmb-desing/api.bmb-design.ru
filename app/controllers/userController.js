const userRepository = require('../repository/userRepository');
const cache = require('../../config/cache');

module.exports = {
  //Всех людей
  getAll: function(req, res, next) {
    cache.get('team', function(err, result) {
      if(err || result == null) {
        userRepository.getAll().then(function(users) {
          cache.set('team', users)
          res.json(users)
        }).catch(function(err) {
          next(err)
        })
      }
      else {
        res.json(result)
      }
    })
  },
  getByAlias: function(req, res, next) {
    const alias = req.params.alias
    cache.get('team[' + alias + ']', function(err, result) {
      if(err || result == null) {
        userRepository.getByAlias(alias).then(function(user) {

          if(!user) {
            res.status(404)
            res.json('Страница не найдена')
          }
          else {
            userRepository.getWorksByUser(user.id).then(function(works) {
              cache.set('team[' + alias + ']', {
                user: user,
                works: works.rows,
                worksCount: works.count
              })
              res.json({
                user: user,
                works: works.rows.slice(0, 3),
                worksCount: works.count
              })
            }).catch(function(err) {
              next(err)
            })
          }
        })
      }
      else {
        res.json({
          user: result.user,
          works: result.works.slice(0, 3),
          worksCount: result.worksCount
        })
      }
    })
  },
  getWorks: function(req,res,next) {
    const alias = req.params.alias
    const page = req.query.page || 1
    const min = 3 * (page - 1)
    const max = 3 * (page - 1) + 3
    cache.get('team[' + alias + ']', function(err, result) {
      if(err || !result) {
        res.status(404)
        res.json('Страница не найдена')
      }
      else {
        res.json(result.works.slice(min, max))
      }
    })
  }
}