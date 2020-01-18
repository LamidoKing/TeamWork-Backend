const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { uploader } = require('../config');
const { dataUri } = require('../middleware');

require('dotenv').config();

const encrypt = async (password) => {
  const hashed = await bcrypt.hash(password, 10);

  return hashed;
};

const getToken = async (userId, rolenumber) => {
  const token = await jwt.sign({ userId, rolenumber }, `${process.env.RANDOM_TOKEN}`, { expiresIn: '24h' });
  return token;
};

const gettUserId = async (req) => {
  const token = await req.headers.authorization.split(' ')[1];
  const { userId } = await jwt.verify(token, `${process.env.RANDOM_TOKEN}`);

  return userId;
};

const processGifToUrl = async (req) => {
  const file = await dataUri(req).content;

  const { url } = await uploader.upload(file);

  return url;
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
      imageUrl: gif.gif_url,
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

  if (dataName === 'create-user') {
    return data.rows.map((field) => ({
      userId: field.user_id,
      email: field.email,
      firstName: field.firstname,
      lastName: field.lastName,
      gender: field.gender,
      jobRole: field.jobrole,
      department: field.department,
      address: field.address,
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
  gettUserId,
  processGifToUrl,
  formatData,
  sortData,
};
