const Router = require('express-promise-router');
const { postArticle, editArticle, deleteArticle, commentArticle, GetArticlebyId, flagArticle } = require('../controllers');
const { auth } = require('../middleware/auth');

const router = new Router();

router.post('/articles', auth, postArticle);
router.post('/articles/:id/comment', auth, commentArticle);
router.patch('/articles/:id', auth, editArticle);
router.delete('/articles/:id', auth, deleteArticle);
router.get('/articles/:id', auth, GetArticlebyId);
router.post('/articles/:id/flag', auth, flagArticle);

module.exports = router;
