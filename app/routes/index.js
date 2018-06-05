const app = require('express');
const router = app.Router();

const auth = require('./auth');

router.get('/', function(req, res, next) {
	res.json(456)
})
router.use('/auth', auth);
module.exports = router