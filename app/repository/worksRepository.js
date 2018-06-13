const database = require('../models/works');
const helpers = require('../helpers/worksHelpers');
const cache = require('../../config/cache');
//@TODO Добавить кеширование
module.exports = {
	//Получение данных для главной
	getIndex: function(callback) {
		cache.get('works-index', function(err, result) {
			if(err || result == null) {
				database.usluga.findAll({
					include: [
						{
							model: database.works,
							as: 'works',
							duplicating: false,
						}
					]
				})
				.then(function(works) {
					const worksSorting = getSortIndex(works)
					cache.set('works-index', worksSorting, function(err) {
						if(err) {
							return callback(err, null)
						}
						else {
							return callback(null, worksSorting)
						}
					})
					
				})
				.catch(function(err) {
					return callback(err, null)
				})
			}
			else {
				console.log(result)
				return callback(null, result)
			}
		})
	},
	//Сортировка данных для вывода на главную
	//Получение всех работ
	getAll: function(page, limit, callback) {
		cache.get('works['+ page + '][' + limit + ']' , function(err, result) {
			if(err || result == null) {
				database.works.findAndCountAll({
					limit: limit,
					offset: limit * (page - 1),
					attributes: ['id', 'alias', 'thumbnail', 'name', 'types']
				})
				.then(function(works) {
					cache.set('works['+ page + '][' + limit + ']', works, function(err) {
						if(err) {
							return callback(err, null)
						}
						else {
							return callback(null, works)
						}
					})
				})
			}
			else {
				return callback(null, result)
			}
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
					attributes: ['first_name', 'last_name', 'id'],
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
	}
}

function getSortIndex(works) {
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
}