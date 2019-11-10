const Router = require('express-promise-router');
const { createUser, signIn } = require('../controllers');
const { auth, authAdmin } = require('../middleware/auth');

const router = new Router();

router.post('/create-user', authAdmin, createUser);
router.post('/signin', signIn);
module.exports = router;
