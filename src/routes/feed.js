const Router = require('express-promise-router');
const { getFeed } = require('../controllers');
const { auth } = require('../middleware');

const router = new Router();

router.get('/feed', auth, getFeed);


module.exports = router;
