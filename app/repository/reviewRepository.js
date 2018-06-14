const review = require('../models/review');

module.exports = {
  all: function() {
    return review.findAndCountAll({
      where: {
        status: 1
      },
      attributes: { exclude: 'email'},
      order: [
        ['createdAt', 'DESC']
      ]
    })
  },
  add: function(item) {
    return review.build(item).save()
  }
}