const reviewRepository = require('../repository/reviewRepository');
const cache = require('../../config/cache');
module.exports = {
  getAll: function(req, res, next) {
    const length = req.query.length || 0
    const max = parseInt(length) + 6
    cache.get('review', function(err, result) {
      if(err || !result) {
        reviewRepository.all().then(function(review) {
          cache.set('review', {
            count: review.count,
            review: review.rows
          })
          res.json({
            count: review.count,
            review: review.rows.slice(length, max)
          })
        })
      }
      else {
        res.json({
          count: result.count,
          review: result.review.slice(length, max)
        })
      }
    })
  },
  addReview: function(req, res, next) {
    const review = {
      name: req.body.name,
      text: req.body.text,
      email: req.body.email
    }
    reviewRepository.add(review).then(function(status) {
      res.json('Успешно отправленно')
    }).catch(function(err) {
      next(err)
    })
  }
}