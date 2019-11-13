const { createUser, signIn } = require('./user');
const { postGif, deleteGif, commentGif } = require('./gif')
const { postArticle, editArticle, deleteArticle, commentArticle } = require('./article')
const { getFeed } = require('./feed');


module.exports = {
  createUser,
  signIn,
  postGif,
  postArticle,
  editArticle,
  deleteArticle,
  deleteGif,
  commentArticle,
  commentGif,
  getFeed,
};
