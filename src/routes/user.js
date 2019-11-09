const Router = require('express-promise-router');
const { createUser } = require('../controllers');
const { auth, authAdmin } = require('../middleware/auth');

const router = new Router();

router.post('/create-user', auth, authAdmin, createUser);

module.exports = router;
