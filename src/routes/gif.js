const Router = require('express-promise-router');
const {
  postGif, deleteGif, commentGif, getGifbyId, flagGif, flagComment,
} = require('../controllers');
const { auth, multerUploads, catchAsync } = require('../middleware');
const { cloudinary } = require('../config');

const router = new Router();

router.post('/gifs', auth, cloudinary, multerUploads, catchAsync(postGif));
router.post('/gifs/:id/comment', auth, catchAsync(commentGif));
router.delete('/gifs/:id', auth, catchAsync(deleteGif));
router.get('/gifs/:id', auth, catchAsync(getGifbyId));
router.post('/gifs/:id/flag', auth, catchAsync(flagGif));
router.post('/gifs/:id/comment/:commentId/flag', auth, catchAsync(flagComment));

module.exports = router;
