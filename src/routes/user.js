const Router = require('express-promise-router');
const { createUser, signIn } = require('../controllers');
const { authAdmin } = require('../middleware/auth');

const router = new Router();
router.post('/signin', signIn);

router.post('/create-user', authAdmin, createUser);

module.exports = router;
