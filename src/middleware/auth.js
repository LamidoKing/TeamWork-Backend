const jwt = require('jsonwebtoken');

require('dotenv').config();

const auth = async (req, res, next) => {
  try {
    const token = await req.headers.authorization.split(' ')[1];

    const decodedToken = jwt.verify(token, `${process.env.RANDOM_TOKEN}`);

    const { userId } = decodedToken;

    if (req.body.user_id && req.body.user_id !== userId) {
      const err = 'Invalid user ID';
      throw err;
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({
      status: 'error',
      error: 'Invalid request!',
    });
  }
};

const authAdmin = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    const err = {
      notAuth: 'Only user with admin access can create account',
      noToken: 'must SignIn As Admin',
    };
    if (authorization) {
      const token = await req.headers.authorization.split(' ')[1];
      const decodedToken = await jwt.verify(token, `${process.env.RANDOM_TOKEN}`);


      const { rolenumber } = decodedToken;

      if (rolenumber.toString() !== process.env.ADMIN) {
        throw err.notAuth;
      } else {
        next();
      }
    } else {
      throw err.noToken;
    }
  } catch (error) {
    res.status(401).json({
      status: 'error',
      error,
    });
  }
};



module.exports = {
  auth,
  authAdmin,
};
