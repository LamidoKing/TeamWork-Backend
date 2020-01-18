const Router = require('express-promise-router');
const { createUser, signIn } = require('../controllers');
const { authAdmin, catchAsync } = require('../middleware');

const router = new Router();
router.post('/signin', signIn);

router.post('/create-user', authAdmin, catchAsync(createUser));

module.exports = router;
