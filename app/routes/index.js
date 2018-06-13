const app = require('express');
const router = app.Router();

const auth = require('./auth');
const system = require('./system');
const projects = require('./projects');
const works = require('./works');


router.use('/auth', auth);
router.use('/system', system);
router.use('/projects', projects);
router.use('/works', works)
module.exports = router