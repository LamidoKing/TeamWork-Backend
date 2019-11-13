const { createUserQuery, findUserQuery } = require('./user');
const {
  postGifQuery, findGifByIdQuery, deleteGifQuery, commentGifQuery, getAllGifs,
} = require('./gif');
const {
  postArticleQuery, editArticleQuery, findArticleByIdQuery,
  deleteArticleQuery, commentArticleQuery, getAllArticles,
  getAllArticleCommentById,
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
  commentGifQuery,
  getAllArticles,
  getAllGifs,
  getAllArticleCommentById,
};
