const { gettUserId, attemptPostArticle } = require('../utils');
const db = require('../db');
const { postGifQuery } = require('../queries');

require('dotenv').config();

const postArticle = async (req, res, next) => {
  try {
    const { title, article } = req.body;

    await attemptPostArticle(title, article);

    const userId = await gettUserId(req);

    const value = [title, userId, article];

    const { rows } = await db.query(postGifQuery, value);

    const data = {
      message: 'Article successfully posted',
      articleId: rows[0].article_id,
      userId: rows[0].user_id,
      title: rows[0].title,
      createdOn: rows[0].created_on,
    };

    res.status(201).json({
      status: 'success',
      data,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      error,
    });
  }
};

module.exports = {
  postArticle,
};
