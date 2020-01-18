const validate = require('./joi');
const { createUserSchema, signInSchema } = require('./user');
const { articleSchema, articleIdShema } = require('./article');
const { gifSchema, gifIdShema } = require('./gif');
const { commentSchema, flagShema, commentIdShema } = require('./general');

module.exports = {
  validate,
  createUserSchema,
  signInSchema,
  articleSchema,
  articleIdShema,
  commentSchema,
  flagShema,
  gifSchema,
  gifIdShema,
  commentIdShema,
};
