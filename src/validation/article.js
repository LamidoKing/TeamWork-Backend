const Joi = require('@hapi/joi');

const articleSchema = Joi.object({
  title: Joi.string().min(3).max(130).required(),
  article: Joi.string().min(10).max(1500).required(),
});

const articleIdShema = Joi.object({
  articleId: Joi.number().required(),
});

module.exports = { articleSchema, articleIdShema };
