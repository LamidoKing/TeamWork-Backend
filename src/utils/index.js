const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../db');
const { findUserQuery } = require('../queries');
const { uploader } = require('../config')
const { dataUri } = require('../middleware')

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

const gettUserId = async (req) => {
  const token = await req.headers.authorization.split(' ')[1];
  const { userId } = await jwt.verify(token, `${process.env.RANDOM_TOKEN}`);

  return userId;
};

const processGifToUrl = async (req) => {
  const err = {
    noFile: 'must provide gif to post',
    fileTypeErr: 'file uploded iss not gif file',
  };

  if (!req.file) {
    throw err.noFile;
  }

  if (req.file.mimetype !== 'image/gif') {
    throw err.fileTypeErr;
  }

  const file = await dataUri(req).content;

  const { url } = await uploader.upload(file)

  return url;
};
module.exports = {
  encrypt,
  getToken,
  attemptCreateUser,
  attemptSignIn,
  gettUserId,
  processGifToUrl,
};
