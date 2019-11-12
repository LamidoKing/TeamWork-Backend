const Router = require('express-promise-router');
const { postGif, deleteGif } = require('../controllers');
const { auth, multerUploads } = require('../middleware');
const { cloudinary } = require('../config');

const router = new Router();

router.post('/gifs', auth, cloudinary, multerUploads, postGif);
router.delete('/gifs/:id', auth, deleteGif);
module.exports = router;
