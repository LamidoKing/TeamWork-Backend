const Joi = require('@hapi/joi');

const commentSchema = Joi.object({
  comment: Joi.string().min(2).max(1500).required(),
});

const flagShema = Joi.object({
  flag: Joi.bool().required(),
});

const commentIdShema = Joi.object({
  commentId: Joi.number().required(),
});

module.exports = { commentSchema, flagShema, commentIdShema };
