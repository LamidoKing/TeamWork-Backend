const { createUser, signIn } = require('./user');
const { postGif } = require('./gif')
const { postArticle, editArticle } = require('./article')

module.exports = {
  createUser,
  signIn,
  postGif,
  postArticle,
  editArticle
};
