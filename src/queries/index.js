const { createUserQuery, findUserQuery } = require('./user');
const { postGifQuery, findGifByIdQuery, deleteGifQuery } = require('./gif');
const {
  postArticleQuery, editArticleQuery, findArticleByIdQuery, deleteArticleQuery, commentArticleQuery,
} = require('./article');

module.exports = {
  createUserQuery,
  findUserQuery,
  postGifQuery,
  postArticleQuery,
  editArticleQuery,
  findArticleByIdQuery,
  findGifByIdQuery,
  deleteArticleQuery,
  deleteGifQuery,
  commentArticleQuery,
};
