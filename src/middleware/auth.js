const jwt = require('jsonwebtoken');
const { BadRequest, Unauthorize } = require('../errors');

require('dotenv').config();

const auth = async (req, res, next) => {
  if (!req.headers.authorization) {
    throw new Unauthorize('You must logged in');
  }

  const token = await req.headers.authorization.split(' ')[1];

  const decodedToken = jwt.verify(token, `${process.env.RANDOM_TOKEN}`);

  const { userId } = decodedToken;

  if (req.body.user_id && req.body.user_id !== userId) {
    const err = 'Invalid user ID';
    throw new Unauthorize(err);
  } else {
    next();
  }
};

const authAdmin = async (req, res, next) => {
  const { authorization } = req.headers;

  const err = 'Not Authorized';

  if (authorization) {
    const token = await authorization.split(' ')[1];

    const decodedToken = await jwt.verify(token, `${process.env.RANDOM_TOKEN}`);

    const { rolenumber } = decodedToken;

    if (rolenumber.toString() !== process.env.ADMIN) {
      throw new Unauthorize(err);
    } else {
      next();
    }
  } else {
    throw new BadRequest('You must logged in');
  }
};


module.exports = {
  auth,
  authAdmin,
};
