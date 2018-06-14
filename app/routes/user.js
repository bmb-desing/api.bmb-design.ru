const app = require('express');
const router = app.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getAll);
router.get('/:alias', userController.getByAlias);
router.get('/:alias/works', userController.getWorks);

module.exports = router