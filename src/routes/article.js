const Router = require('express-promise-router');
const { postArticle, editArticle } = require('../controllers');
const { auth } = require('../middleware/auth');

const router = new Router();

router.post('/articles', auth, postArticle);
router.patch('/articles/:id', auth, editArticle);

module.exports = router;
