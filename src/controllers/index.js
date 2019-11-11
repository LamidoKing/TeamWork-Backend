const { createUser, signIn } = require('./user');
const { postGif } = require('./gif')

module.exports = {
  createUser,
  signIn,
  postGif,
};
