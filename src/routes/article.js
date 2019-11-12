const Router = require('express-promise-router');
const { postArticle, editArticle, deleteArticle, commentArticle } = require('../controllers');
const { auth } = require('../middleware/auth');

const router = new Router();

router.post('/articles', auth, postArticle);
router.post('/articles/:id/comment', auth, commentArticle);
router.patch('/articles/:id', auth, editArticle);
router.delete('/articles/:id', auth, deleteArticle);

module.exports = router;
