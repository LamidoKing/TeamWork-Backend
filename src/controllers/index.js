const { createUser, signIn } = require('./user');
const {
  postGif, deleteGif, commentGif, getGifbyId, flagGif,
} = require('./gif');

const {
  postArticle, editArticle, deleteArticle,
  commentArticle, GetArticlebyId, flagArticle,
} = require('./article');

const { getFeed } = require('./feed');
const { flagComment } = require('./flagcomment');

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
  GetArticlebyId,
  getGifbyId,
  flagArticle,
  flagGif,
  flagComment,
};
