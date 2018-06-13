const app = require('express');
const router = app.Router();
const worksController = require('../controllers/worksController');

router.get('/', worksController.getForIndex);
router.get('/all', worksController.getAll);
router.get('/:type', worksController.getByType);
router.get('/item/:alias', worksController.getByAlias);

module.exports = router
