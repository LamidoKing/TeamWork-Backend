const {
  gettUserId, attemptPostArticle, searchAtrribute, validateInputsFields, formatData,
} = require('../utils');
const db = require('../db');
const {
  postArticleQuery, editArticleQuery, findArticleByIdQuery,
  deleteArticleQuery, commentArticleQuery, getAllArticleCommentById, flagArticleQuery,
} = require('../queries');

require('dotenv').config();

const postArticle = async (req, res) => {
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

    return res.status(201).json({
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

const editArticle = async (req, res) => {
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

    return res.status(201).json({
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

const deleteArticle = async (req, res) => {
  try {
    const articleId = parseInt(req.params.id, 10);

    const result = await db.query(findArticleByIdQuery, [articleId]);

    await searchAtrribute(result, 'article');

    const value = [articleId];

    await db.query(deleteArticleQuery, value);

    const data = {
      message: 'Article successfully deleted',
    };

    return res.status(200).json({
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

const commentArticle = async (req, res) => {
  try {
    const fields = req.body.comment;

    await validateInputsFields(fields, 'comment');

    const articleId = parseInt(req.params.id, 10);

    const userId = await gettUserId(req);

    const result = await db.query(findArticleByIdQuery, [articleId]);

    const article = await searchAtrribute(result, 'article');


    const value = [userId, fields, articleId];

    const { rows } = await db.query(commentArticleQuery, value);

    const data = {
      message: 'Comment successfully created',
      commentID: rows[0].comment_id,
      articleTitle: article.title,
      article: article.article,
      comment: rows[0].comment,
      createdOn: rows[0].created_on,
    };

    return res.status(201).json({
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

const GetArticlebyId = async (req, res) => {
  try {
    const articleId = parseInt(req.params.id, 10);

    const articles = await db.query(findArticleByIdQuery, [articleId]);

    await searchAtrribute(articles, 'article');

    const comments = await db.query(getAllArticleCommentById, [articleId]);

    const formatedArticle = await formatData(articles, 'articles');
    const formatedComment = await formatData(comments, 'comments');

    const data = {
      ...formatedArticle[0],
      comments: [...formatedComment],
    };

    return res.status(200).json({
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

const flagArticle = async (req, res) => {
  try {
    const fields = req.body.flag;

    await validateInputsFields(fields, 'flag');

    const articleId = parseInt(req.params.id, 10);

    const userId = await gettUserId(req);

    const result = await db.query(findArticleByIdQuery, [articleId]);

    const article = await searchAtrribute(result, 'article');

    const value = [userId, fields, articleId];

    const flag = await db.query(flagArticleQuery, value);

    const formatedArticle = await formatData(flag, 'flag');

    const data = {
      message: 'article flag  successfully',
      ...formatedArticle[0],
      articleTitle: article.title,
      article: article.article,
    };

    return res.status(201).json({
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
  deleteArticle,
  commentArticle,
  GetArticlebyId,
  flagArticle,
};
