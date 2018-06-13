const worksRepository = require('../repository/worksRepository');
const cache = require('../../config/cache');
module.exports = {
	//Получение для главной
	getForIndex: function(req, res, next) {
		cache.get('works-index', function(err, result) {
			if(err || result == null) {
				worksRepository.getIndex().then(function(works) {
					const worksIndex = worksRepository.getSortIndex(works)
					cache.set('works-index', worksIndex)
					res.json(worksIndex)
				})
			}
			else {
				res.json(result)
			}
		})
	},
	getAll: function(req, res, next) {
		const limit = req.query.count * 3 || 3 * 3;
		const page = req.query.page || 1;
		const countMin = limit * (page - 1);
		const countMax = limit * (page - 1) + limit;
		cache.get('works', function(err, result) {
			if(err || result == null) {
				worksRepository.getAll().then(function(works) {
					cache.set('works', works)
					res.json({
						count: works.count,
						works: works.rows.slice(countMin, countMax),
						countInPage: limit
					})
				})
			}
			else {
				res.json({
					count: result.count,
					works: result.rows.slice(countMin, countMax),
					countInPage: limit
				})
			}
		})
		
		
	},
	getByType: function(req, res, next) {
		const limit = req.query.count * 3 || 3 * 3;
		const page = req.query.page || 1;
		const type = req.params.type;
		const countMin = limit * (page - 1);
		const countMax = limit * (page - 1) + limit;
		cache.get('works[' + type + ']', function(err, result) {
			if(err || result == null) {
				worksRepository.getByType(type).then(function(works) {
					if(works.rows.length) {
						cache.set('works[' + type + ']', works)
						res.json({
							count: works.count,
							works: works.rows.slice(countMin, countMax),
							countInPage: limit
						})
					}
					else {
						res.status(404)
						res.json('Страница не найдена')
					}
				}).catch(function(err) {
					next(err)
				})
			}
			else {
				res.json({
					count: result.count,
					works: result.rows.slice(countMin, countMax),
					countInPage: limit
				});
			}
		})
	},
	getByAlias: function(req, res, next) {
		const alias = req.params.alias;
		cache.get('works-item[' + alias + ']', function(err, result) {
			if(err || result == null) {
				worksRepository.getByAlias(alias)
				.then(function(work) {
					console.log(work)
					if(work) {
						//@TODO Добавить случайные работы
						cache.set('works-item[' + alias + ']', work)
						res.json(work)
					}
					else {
						res.status(404)
						res.json('Страница не найдена')
					}
				})
				.catch(function(err) {
					next(err)
				})
			}
			else {
				res.json(result)
			}
		})
	}
}