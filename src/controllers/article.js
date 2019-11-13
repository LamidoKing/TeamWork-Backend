const {
  gettUserId, attemptPostArticle, searchAtrribute, validateInputsFields, formatData,
} = require('../utils');
const db = require('../db');
const {
  postArticleQuery, editArticleQuery, findArticleByIdQuery,
  deleteArticleQuery, commentArticleQuery, getAllArticleCommentById,
} = require('../queries');

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

const deleteArticle = async (req, res, next) => {
  try {
    const articleId = parseInt(req.params.id, 10);

    const result = await db.query(findArticleByIdQuery, [articleId]);

    await searchAtrribute(result, 'article');

    const value = [articleId];

    await db.query(deleteArticleQuery, value);

    const data = {
      message: 'Article successfully deleted',
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

const commentArticle = async (req, res, next) => {
  try {
    const fields = {
      comment: req.body.comment,
    };

    await validateInputsFields(fields, 'comment');

    const articleId = parseInt(req.params.id, 10);

    const userId = await gettUserId(req);

    const result = await db.query(findArticleByIdQuery, [articleId]);

    const article = await searchAtrribute(result, 'article');


    const value = [userId, fields.comment, articleId];

    const { rows } = await db.query(commentArticleQuery, value);

    const data = {
      message: 'Comment successfully created',
      commentID: rows[0].comment_id,
      articleTitle: article.title,
      article: article.article,
      comment: rows[0].comment,
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

const GetArticlebyId = async (req, res, next) => {
  try {

    const articleId = parseInt(req.params.id, 10);

    const articles = await db.query(findArticleByIdQuery, [articleId]);
    const comments = await db.query(getAllArticleCommentById, [articleId]);

    const formatedArticle = await formatData(articles, 'articles');
    const formatedComment = await formatData(comments, 'comments');
    

    const data = {
      ...formatedArticle[0],
      comments: [...formatedComment],
    }

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
  editArticle,
  deleteArticle,
  commentArticle,
  GetArticlebyId,
};
