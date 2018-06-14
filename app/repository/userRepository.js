const model = require('../models/user')

module.exports = {
  getAll: function() {
    return model.user.findAll({
      order: [
        ['id', 'ASC']
      ],
      attributes: ['alias', 'id', 'first_name', 'last_name'],
      include: [
        {
          model: model.info,
          attributes: [
            'avatar', 'shortText', 'position'
          ]
        },
        {
          model: model.works,
          as: 'works',
          attributes: ['id'],
          through: {
            attributes: []
          }
        }
      ]
    })
  },
  getByAlias: function(alias) {
    return model.user.findOne({
      where: {
        alias: alias
      },
      attributes: ['alias', 'id', 'first_name', 'last_name'],
      include: [
        {
          model: model.info,
          attributes: [
            'avatar', 'text', 'position'
          ]
        }
      ]
    })
  },
  getWorksByUser: function(id) {
    return model.works.findAndCountAll({
      order: [['createdAt', 'DESC']],
      attributes: ['id', 'alias', 'thumbnail', 'name', 'types', 'createdAt'],
      include: [
        {
          model: model.user,
          as: 'user',
          attributes: [],
          where: {
            id: id
          },
          through: {
            attributes: []
          }
        }
      ]
    })
  }
}