const { authAdmin, auth } = require('./auth');
const {multerUploads, dataUri } = require('./multer-config.js')

module.exports = {
  authAdmin,
  auth,
  multerUploads,
  dataUri,
};
