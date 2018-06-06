const app = require('express');
const router = app.Router();

const auth = require('./auth');
const system = require('./system');
const projects = require('./projects');


router.get('/', function(req, res, next) {
	res.json(456)
})
router.use('/auth', auth);
router.use('/system', system);
router.use('/projects', projects);
module.exports = router