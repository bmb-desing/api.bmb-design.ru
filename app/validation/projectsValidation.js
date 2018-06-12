const Joi = require('joi');
module.exports = {
	createProject: function(req, res, next) {
		const schema = {
			name: Joi.string().required(),
		}
		Joi.validate(
			{
				name: req.body.name
			},
			schema,
			function(err, value) {
				if(err) {
					res.status(400)
					res.json(err)
				}
				else {
					next()
				}
			}
		)
	}
}