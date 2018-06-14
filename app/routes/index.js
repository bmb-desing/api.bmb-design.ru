const app = require('express');
const router = app.Router();

const auth = require('./auth');
const system = require('./system');
const projects = require('./projects');
const works = require('./works');
const user = require('./user');
const review = require('./review');
const news = require('./news');


router.use('/auth', auth);
router.use('/system', system);
router.use('/projects', projects);
router.use('/works', works);
router.use('/user', user);
router.use('/review', review);
router.use('/news', news)

module.exports = router