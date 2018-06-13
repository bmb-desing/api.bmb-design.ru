const worksRepository = require('../repository/worksRepository');
const cache = require('../../config/cache');
module.exports = {
	//Получение для главной
	getForIndex: function(req, res, next) {
		worksRepository.getIndex(function(err, works) {
			if(err) {
				next(err) 
			}
			else {
				res.json(works)
			}
		})
	},
	getAll: function(req, res, next) {
		const limit = req.query.count * 3 || 3 * 3;
		const page = req.query.page || 1;
		worksRepository.getAll(page, limit, function(err, result) {
			if(err) {
				next(err) 
			}
			else {
				if(!result.rows.length) {
					res.status(404)
					res.json('Страница не найдена')
				}
				else {
					res.json(result)
				}
				
			}
		})
		
	},
	getByType: function(req, res, next) {
		const limit = req.query.count * 3 || 3 * 3;
		const page = req.query.page || 1;
		const type = req.params.type;
		cache.get('works[' + type + '][' + page + '][' + limit + ']', function(err, result) {
			if(err || result == null) {
				worksRepository.getByType(type, page, limit).then(function(works) {
					if(works.rows.length) {
						cache.set('works[' + type + '][' + page + '][' + limit + ']', {count: works.count, works: works.rows, countInPage: limit})
						res.json({
							count: works.count,
							works: works.rows,
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
				res.json(result);
			}
		})
	},
	getByAlias: function(req, res, next) {
		const alias = req.params.alias;
		cache.get('works-item[' + alias + ']', function(err, result) {
			if(err || result == null) {
				worksRepository.getByAlias(alias)
				.then(function(work) {
					if(work) {
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