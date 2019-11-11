const { createUserQuery, findUserQuery } = require('./user');
const { postGifQuery } = require('./gif')
const { postArticleQuery } = require('./article')

module.exports = {
  createUserQuery,
  findUserQuery,
  postGifQuery,
  postArticleQuery,
};
