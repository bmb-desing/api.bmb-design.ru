const Joi = require('joi');

module.exports = {
  //Валидация при авторизации
  loginValidation: function(req, res, next) {
    const schema = {
      email: Joi.string().email().required(),
      password: Joi.required()
    }
    Joi.validate(
      {
        email: req.body.email,
        password: req.body.password
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