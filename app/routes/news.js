const app = require('express');
const router = app.Router();
const newsController = require('../controllers/newsController');
router.get('/', newsController.forIndex);
router.get('/all', newsController.getAll);
router.get('/:alias', newsController.getByAlias);

module.exports = router