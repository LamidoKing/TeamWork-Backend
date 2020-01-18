const { authAdmin, auth } = require('./auth');
const { multerUploads, dataUri } = require('./multer-config.js');
const { catchAsync, notFound, serverError } = require('./errors');

module.exports = {
  authAdmin,
  auth,
  multerUploads,
  dataUri,
  catchAsync,
  notFound,
  serverError,
};
