const app = require('express');
const router = app.Router();
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const projectsController = require('../controllers/projectsController');
const projectsValidation = require('../validation/projectsValidation');

router.use(authMiddleware.isAuth);
router.get('/', projectsController.findAll);
router.get('/:project', projectsController.getByAlias);
router.post('/add', roleMiddleware.isAdmin,
										projectsValidation.createProject,
										projectsController.addProject);

module.exports = router