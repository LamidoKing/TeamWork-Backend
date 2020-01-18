const Router = require('express-promise-router');
const {
  postArticle, editArticle, deleteArticle,
  commentArticle, GetArticlebyId, flagArticle, flagComment,
} = require('../controllers');
const { auth, catchAsync } = require('../middleware');

const router = new Router();

router.post('/articles', auth, catchAsync(postArticle));
router.post('/articles/:id/comment', auth, catchAsync(commentArticle));
router.patch('/articles/:id', auth, catchAsync(editArticle));
router.delete('/articles/:id', auth, catchAsync(deleteArticle));
router.get('/articles/:id', auth, catchAsync(GetArticlebyId));
router.post('/articles/:id/flag', auth, catchAsync(flagArticle));
router.post('/articles/:id/comment/:commentId/flag', auth, catchAsync(flagComment));

module.exports = router;
