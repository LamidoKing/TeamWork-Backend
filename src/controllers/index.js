const { createUser, signIn } = require('./user');
const { postGif, deleteGif, commentGif, getGifbyId } = require('./gif')
const { 
  postArticle, editArticle, deleteArticle,
  commentArticle, GetArticlebyId,
} = require('./article')
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
  GetArticlebyId,
  getGifbyId,
};
