const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../db');
const { findUserQuery } = require('../queries');

require('dotenv').config();

const encrypt = async (password) => {
  const err = 'password field cannot be empty';

  if (password) {
    const hashed = await bcrypt.hash(password, 10);
    return hashed;
  }
  throw err;
};

const decrypt = async (user, password) => {
  const err = 'password is not correct';
  const { valid } = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw err;
  }
};

const getToken = async (userId, rolenumber) => {
  const token = await jwt.sign({ userId, rolenumber }, `${process.env.RANDOM_TOKEN}`, { expiresIn: '24h' });
  return token;
};

const attemptCreateUser = async (email) => {
  const err = {
    emailTaken: 'email has been taken',
    invalidEmail: 'invalid email check and try again',
    emptyEmail: 'Email field cannot be empty',
  };

  const isvalid = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  const { rows } = await db.query(findUserQuery, [email]);

  if (email) {
    if (rows.length > 0) {
      throw err.emailTaken;
    }

    if (!isvalid.test(email)) {
      throw err.invalidEmail;
    }
  }
  if (!email) {
    throw err.emptyEmail;
  }
  return email;
};

const attemptSignIn = async (rows, password) => {
  const err = {
    nouser: 'user with this doent exist',
    passwordError: 'password is not correct',
  };

  if (!rows[0]) {
    throw err.nouser;
  }
  const valid = await bcrypt.compare(password, rows[0].password);

  if (!valid) {
    throw err.passwordError;
  }

  return rows[0];
};

module.exports = {
  encrypt,
  getToken,
  attemptCreateUser,
  attemptSignIn,
};
