const app = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const router = app.Router();
const passport = require('../../config/passport');

<<<<<<< HEAD
router.get('/login', passport.authenticate('jwt', {session: false}), function(req, res, json) {
  res.json(1)
})
=======
router.get('/login', authMiddleware.isAuth, authMiddleware.nextPage)
>>>>>>> 662089df56af17c3ade8918d7d22c7fb27fc0bf9
router.post('/login', authController.loginPost)
module.exports = router