const app = require('express');
const router = app.Router();

const systemController = require('../controllers/systemContoller');

router.get('/', systemController.getAllSystem)

module.exports = router