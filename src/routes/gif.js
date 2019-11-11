const Router = require('express-promise-router');
const { postGif } = require('../controllers');
const { auth } = require('../middleware/auth');
const { multerUploads } = require('../middleware');
const { cloudinary } = require('../config');

const router = new Router();

router.post('/gifs', auth, cloudinary, multerUploads, postGif);
module.exports = router;
