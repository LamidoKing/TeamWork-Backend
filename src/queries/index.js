const { createUserQuery, findUserQuery } = require('./user');
const { postGifQuery } = require('./gif')
const { postArticleQuery, editArticleQuery, findArticleByIdQuery } = require('./article')
module.exports = {
  createUserQuery,
  findUserQuery,
  postGifQuery,
  postArticleQuery,
  editArticleQuery,
  findArticleByIdQuery,
};
