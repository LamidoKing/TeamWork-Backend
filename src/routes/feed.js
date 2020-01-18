const Router = require('express-promise-router');
const { getFeed } = require('../controllers');
const { auth, catchAsync } = require('../middleware');

const router = new Router();

router.get('/feed', auth, catchAsync(getFeed));


module.exports = router;
