const database = require('../models/works');
const helpers = require('../helpers/worksHelpers');
//@TODO Добавить кеширование
module.exports = {
	//Получение данных для главной
	getIndex: function() {
		return database.usluga.findAll({
			include: [
				{
					model: database.works,
					as: 'works',
					duplicating: false,
				}
			]

		})
	},
	//Сортировка данных для вывода на главную
	getSortIndex: function(works) {
		var worksArray = []
		works.map(function(item) {
			var itemArr = {
				id: item.id,
				name: item.name,
				alias: item.alias,
				works: helpers.getFourWorks(item.works)
			}
			worksArray.push(itemArr)
		})
		return worksArray
	},
	//Получение всех работ
	getAll: function(page, limit) {
		return database.works.findAndCountAll({
			limit: limit,
			offset: limit * (page - 1),
			attributes: ['id', 'alias', 'thumbnail', 'name', 'types']
		})
	},
	//Получение по типу
	getByType: function(type, page, limit) {
		return database.works.findAndCountAll({
			limit: limit,
			offset: limit * (page - 1),
			attributes: ['id', 'alias', 'thumbnail', 'name', 'types'],
			include: [
				{
					as: 'usluga',
					model: database.usluga,
					where: {
						alias: type
					},
					attributes: ['id', 'alias'],
					through: {
						attributes: []
					}
				}
			]
		})
	},
	getByAlias: function(alias) {
		return database.works.findOne({
			where: {
				alias: alias
			},
			include: [
				{
					model: database.user,
					as: 'user',
					through: {
						attributes: []
					}
				},
				{
					model: database.usluga,
					as: 'usluga',
					through: {
						attributes: []
					}
				}
			]
		})
	}
}