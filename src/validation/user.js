const Joi = require('@hapi/joi');

const email = Joi.string()
  .email()
  .min(8)
  .max(254)
  .lowercase()
  .trim()
  .required();

const password = Joi.string()
  .min(2)
  .max(130)
  .required();

const createUserSchema = Joi.object({
  email,
  password,
  firstname: Joi.string()
    .min(2)
    .max(130),
  lastname: Joi.string()
    .min(2)
    .max(130),
  gender: Joi.number()
    .min(2)
    .max(130),
  jobrole: Joi.string()
    .min(2)
    .max(130),
  department: Joi.string()
    .min(2)
    .max(130),
  address: Joi.string()
    .min(4)
    .max(250),
});

const signInSchema = Joi.object({
  email,
  password,
});

module.exports = { createUserSchema, signInSchema };
