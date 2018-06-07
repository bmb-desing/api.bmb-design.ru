const app = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const router = app.Router();
router.get('/user', authMiddleware.isAuth, authController.getUser);
router.get('/login', authMiddleware.isAuth, authMiddleware.nextPage)
router.post('/login', authController.loginPost)
module.exports = router