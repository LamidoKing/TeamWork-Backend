const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../db');
const { findUserQuery } = require('../queries');
const { uploader } = require('../config');
const { dataUri } = require('../middleware');

require('dotenv').config();

const encrypt = async (password) => {
  const err = 'password field cannot be empty';

  if (password) {
    const hashed = await bcrypt.hash(password, 10);
    return hashed;
  }
  throw err;
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

  const isvalid = /^([a-zA-Z0-9_-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

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

  const { url } = await uploader.upload(file);

  return url;
};

const attemptPostArticle = async (title, article) => {
  const err = {
    noTitle: 'must provide title for the article',
    noArticle: 'must provide article to post',
  };

  if (!title) {
    throw err.noTitle;
  }

  if (!article) {
    throw err.noArticle;
  }
  return true;
};

const searchAtrribute = async (result, name) => {
  const err = {
    noattr: `${name} doent exist`,
  };

  if (!result.rows[0]) {
    throw err.noattr;
  }
  return result.rows[0];
};

const validateInputsFields = (fields, model) => {
  const err = {
    comment: {
      noComment: 'must input your comment',
      FlagError: 'must input flag and must be boolean',
    },
  };

  if (model === 'comment') {
    if (!fields.comment) {
      throw err.comment.noComment;
    }
    return true;
  }

  if (model === 'flag') {
    if (fields.flag === undefined || typeof fields.flag !== 'boolean') {
      throw err.comment.FlagError;
    }
    return true;
  }
  return true;
};

const formatData = async (data, dataName) => {
  if (dataName === 'articles') {
    return data.rows.map((article) => ({
      id: article.article_id,
      createdOn: article.created_on,
      title: article.title,
      article: article.article,
      authorId: article.user_id,
    }));
  }

  if (dataName === 'gifs') {
    return data.rows.map((gif) => ({
      id: gif.gif_id,
      createdOn: gif.created_on,
      title: gif.title,
      gifUrl: gif.gif_url,
      authorId: gif.user_id,
    }));
  }

  if (dataName === 'comments') {
    return data.rows.map((comment) => ({
      commentId: comment.comment_id,
      comment: comment.comment,
      authorId: comment.user_id,
    }));
  }

  if (dataName === 'flag') {
    return data.rows.map((flag) => ({
      flagID: flag.flag_id,
      userId: flag.user_id,
      flag: flag.flag,
      createdOn: flag.created_on,
    }));
  }
  return true;
};

const sortData = async (data) => data.sort((a, b) => {
  const item1 = new Date(a.createdOn);
  const item2 = new Date(b.createdOn);

  if (item1 > item2) {
    return -1;
  }
  if (item1 === item2) {
    return 0;
  }
  return 1;
});

module.exports = {
  encrypt,
  getToken,
  attemptCreateUser,
  attemptSignIn,
  gettUserId,
  processGifToUrl,
  attemptPostArticle,
  searchAtrribute,
  validateInputsFields,
  formatData,
  sortData,
};
