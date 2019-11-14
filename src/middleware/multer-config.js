const multer = require('multer');
const Datauri = require('datauri');
const path = require('path');

const storage = multer.memoryStorage();

const multerUploads = multer({ storage }).single('gif');

const dUri = new Datauri();

const dataUri = (req) => {
  const uri = dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);
  return uri;
};

module.exports = { multerUploads, dataUri };
