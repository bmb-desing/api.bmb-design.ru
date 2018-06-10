const app = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const authValidation = require('../validation/authValidation');
const router = app.Router();
router.get('/user', authMiddleware.isAuth, authController.getUser);
router.post('/login', authValidation.loginValidation, 
                      authController.loginPost)
module.exports = router