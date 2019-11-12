const { gettUserId, attemptPostArticle, searchAtrribute } = require('../utils');
const db = require('../db');
const { postArticleQuery, editArticleQuery, findArticleByIdQuery } = require('../queries');

require('dotenv').config();

const postArticle = async (req, res, next) => {
  try {
    const { title, article } = req.body;

    await attemptPostArticle(title, article);

    const userId = await gettUserId(req);

    const value = [title, userId, article];

    const { rows } = await db.query(postArticleQuery, value);

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

const editArticle = async (req, res, next) => {
  try {
    const { title, article } = req.body;

    const articleId = parseInt(req.params.id, 10);

    await attemptPostArticle(title, article);

    const result = await db.query(findArticleByIdQuery, [articleId]);

    await searchAtrribute(result, 'article');

    const value = [title, article, articleId];

    const { rows } = await db.query(editArticleQuery, value);

    const data = {
      message: 'Article successfully Edited',
      title: rows[0].title,
      article: rows[0].article,
    };

    res.status(201).json({
      status: 'success',
      data,
    });
  } catch (error) {
    return res.status(400).json({
      status: 'error',
      error,
    });
  }
};

module.exports = {
  postArticle,
  editArticle,
};
