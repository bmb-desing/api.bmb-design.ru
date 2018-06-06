const app = require('express');
const router = app.Router();
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const projectsController = require('../controllers/projectsController');

router.use(authMiddleware.isAuth);
router.get('/', projectsController.findAll);
router.get('/:project', projectsController.getByAlias);
router.post('/add', roleMiddleware.isAdmin)

module.exports = router