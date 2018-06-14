const model = require('../models/news');

module.exports = {
  all() {
    return model.findAndCountAll({
      attributes: {
        exclude: ['text', 'title', 'description']
      },
      order: [
        ['createdAt', 'DESC']
      ]
    });
  },
  one(alias) {
    return model.findOne({
      attributes: {
        exclude: 'shortText'
      },
      where: {
        alias: alias
      }
    })
  }
}