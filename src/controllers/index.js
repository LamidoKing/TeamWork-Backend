const { createUser, signIn } = require('./user');
const { postGif } = require('./gif')
const { postArticle } = require('./article')

module.exports = {
  createUser,
  signIn,
  postGif,
  postArticle,
};
