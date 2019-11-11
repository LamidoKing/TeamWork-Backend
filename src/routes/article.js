const Router = require('express-promise-router');
const { postArticle } = require('../controllers');
const { auth } = require('../middleware/auth');

const router = new Router();

router.post('/articles', auth, postArticle);

module.exports = router;
