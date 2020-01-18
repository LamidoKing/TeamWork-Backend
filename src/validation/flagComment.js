
const Joi = require('@hapi/joi');

const articleSchema = Joi.object({
  title: Joi.string().min(3).max(130).required(),
  article: Joi.string().min(10).max(1500).required(),
});

const commentIdShema = Joi.object({
  commentId: Joi.number().required(),
});

module.exports = { articleSchema, commentIdShema };
