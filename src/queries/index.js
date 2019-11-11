const { createUserQuery, findUserQuery } = require('./user');
const { postGifQuery } = require('./gif')

module.exports = {
  createUserQuery,
  findUserQuery,
  postGifQuery,
};
