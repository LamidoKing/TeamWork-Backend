const Joi = require('@hapi/joi');

const gifSchema = Joi.object({
  title: Joi.string().min(3).max(130).required(),
  file: Joi.object().required(),
  mimetype: Joi.string().valid('image/gif').required(),
});

const gifIdShema = Joi.object({
  gifId: Joi.number().required(),
});

module.exports = { gifSchema, gifIdShema };
