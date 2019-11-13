const { createUserQuery, findUserQuery } = require('./user');
const {
  postGifQuery, findGifByIdQuery, deleteGifQuery,
  commentGifQuery, getAllGifs, getAllGifCommentById, flagGifQuery,
} = require('./gif');
const {
  postArticleQuery, editArticleQuery, findArticleByIdQuery,
  deleteArticleQuery, commentArticleQuery, getAllArticles,
  getAllArticleCommentById, flagArticleQuery
} = require('./article');

const { flagcommentQuery, findCommentByIdQuery } = require('./flagcomment')

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
  getAllGifCommentById,
  flagArticleQuery,
  flagGifQuery,
  flagcommentQuery,
  findCommentByIdQuery,
};
