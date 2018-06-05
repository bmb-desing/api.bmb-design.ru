const app = require('express');
const authController = require('../controllers/authController');
const router = app.Router();
const passport = require('../../config/passport');

router.get('/login', passport.authenticate('jwt'))
router.post('/login', authController.loginPost)
module.exports = router