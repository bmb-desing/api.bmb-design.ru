const database = require('../models/works');
const helpers = require('../helpers/worksHelpers');
//@TODO Добавить кеширование
module.exports = {
	//Получение данных для главной
	getIndex: function() {
		return database.usluga.findAll({
			order: [['createdAt', 'DESC']],
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
	getAll: function() {
		return database.works.findAndCountAll({
			order: [['createdAt', 'DESC']],
			attributes: ['id', 'alias', 'thumbnail', 'name', 'types', 'createdAt']
		})
	},
	//Получение по типу
	getByType: function(type) {
		return database.works.findAndCountAll({
			order: [['createdAt', 'DESC']],
			attributes: ['id', 'alias', 'thumbnail', 'name', 'types', 'createdAt'],
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
	//Получение по ссылке
	getByAlias: function(alias) {
		return database.works.findOne({
			where: {
				alias: alias
			},
			include: [
				{
					model: database.user,
					as: 'user',
					attributes: ['first_name', 'last_name', 'id', 'alias'],
					through: {
						attributes: []
					}
				},
				{
					model: database.usluga,
					as: 'usluga',
					attributes: ['name', 'id', 'alias'],
					through: {
						attributes: []
					}
				},
				{
					model: database.images,
					as: 'images'
				}
			]
		})
	},
	//Получение случайных
	getRandom: function(alias) {
		return database.works.findAll({
			where: {
				$not: {
					alias: alias
				}
			},
			limit: 3,
			attributes: ['id', 'alias', 'thumbnail', 'name', 'types', 'createdAt'],
			order: [
				[database.sequelize.fn('RAND', '')]
			]
		})
	}
}