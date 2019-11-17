const Router = require('express-promise-router');
const { documentation, serve } = require('../documentation/apiDocs');
const { apiDocs } = require('../controllers/apiDocs');

const router = new Router();

router.use('/api-docs', serve, documentation);
router.get('/swagger.json', apiDocs);

module.exports = router;
