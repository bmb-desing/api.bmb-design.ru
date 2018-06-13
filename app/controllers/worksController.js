const worksRepository = require('../repository/worksRepository');
module.exports = {
	//Получение для главной
	getForIndex: function(req, res, next) {
		worksRepository.getIndex()
			.then(function(works) {
				const workItems = worksRepository.getSortIndex(works)
				res.json(workItems)
			})
			.catch(function(err) {
				next(err)
			})
	},
	getAll: function(req, res, next) {
		const limit = req.query.count * 3 || 3 * 3;
		const page = req.query.page || 1;
		worksRepository.getAll(page, limit)
			.then(function(works) {
				res.json({
					count: works.count,
					works: works.rows,
					countInPage: limit
				})
			})
			.catch(function(err) {
				next(err)
			})
	},
	getByType: function(req, res, next) {
		const limit = req.query.count * 3 || 3 * 3;
		const page = req.query.page || 1;
		const type = req.params.type;
		worksRepository.getByType(type, page, limit)
			.then(function(works) {
				if(works.rows.length) {
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
			})
			.catch(function(err) {
				next(err)
			})
	}
}