const { BadRequest } = require('../errors');

const validate = async (schema, payload) => {
  try {
    await schema.validateAsync(payload, { abortEarly: false });
  } catch (error) {
    throw new BadRequest(error);
  }
};

module.exports = validate;
