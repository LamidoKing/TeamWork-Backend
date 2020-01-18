/* eslint-disable max-classes-per-file */
class BadRequest extends Error {
  constructor(message = 'Bad Request') {
    super(message);

    this.status = 400;
  }
}

class Unauthorize extends Error {
  constructor(message = 'Unauthorize') {
    super(message);

    this.status = 401;
  }
}

module.exports = {
  BadRequest, Unauthorize,
};
