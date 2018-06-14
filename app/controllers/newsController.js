const newsRepository = require('../repository/newsRepository');
module.exports = {
  forIndex: function(req, res, next) {
    newsRepository.all().then(function(news) {
      res.json(news.rows.slice(0, 3))
    }).catch(function(err) {
      next(err)
    })
  },
  getAll: function(req, res, next) {
    const page = req.query.page || 1;
    const limit = 5;
    const min = limit * (page - 1)
    const max = limit * page
    newsRepository.all().then(function(news) {
      res.json({
        count: news.count,
        news: news.rows.slice(min, max)
      })
    }).catch(function(err) {
      next(err)
    })
  },
  getByAlias: function(req, res, next) {
    const alias = req.params.alias;
    newsRepository.one(alias).then(function(news) {
      if(!news) {
        res.status(404)
        res.json('Страница не найдена')
      }
      else {
        res.json(news)
      }
    }).catch(function(err) {
      next(err)
    })
  }
}