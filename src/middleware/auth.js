const jwt = require('jsonwebtoken');
require('dotenv').config();

const getToken = (userId) => jwt.sign(
  { userId },
  `${process.env.RANDOM_TOKEN}`,
  { expiresIn: '24h' },
);
module.exports = {
  getToken,
};
