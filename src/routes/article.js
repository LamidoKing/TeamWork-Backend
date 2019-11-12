const Router = require('express-promise-router');
const { postArticle, editArticle, deleteArticle } = require('../controllers');
const { auth } = require('../middleware/auth');

const router = new Router();

router.post('/articles', auth, postArticle);
router.patch('/articles/:id', auth, editArticle);
router.delete('/articles/:id', auth, deleteArticle);

module.exports = router;
