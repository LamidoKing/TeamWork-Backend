const { formatData, gettUserId } = require('../utils');
const { searchAtrribute } = require('../auth');
const db = require('../db');
const {
  postArticleQuery,
  editArticleQuery,
  findArticleByIdQuery,
  deleteArticleQuery,
  commentArticleQuery,
  getAllArticleCommentById,
  flagArticleQuery,
} = require('../queries');
const {
  articleSchema,
  articleIdShema,
  commentSchema,
  flagShema,
  validate,
} = require('../validation');

require('dotenv').config();


const postArticle = async (req, res) => {
  await validate(articleSchema, req.body);

  const { title, article } = req.body;

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
};

const editArticle = async (req, res) => {
  const articleId = parseInt(req.params.id, 10);

  await validate(articleIdShema, { articleId });

  await validate(articleSchema, req.body);

  const { title, article } = req.body;


  const result = await db.query(findArticleByIdQuery, [articleId]);

  await searchAtrribute(result, 'article');

  const value = [title, article, articleId];

  const { rows } = await db.query(editArticleQuery, value);

  const data = {
    message: 'Article successfully updated',
    title: rows[0].title,
    article: rows[0].article,
  };

  return res.status(201).json({
    status: 'success',
    data,
  });
};

const deleteArticle = async (req, res) => {
  const articleId = parseInt(req.params.id, 10);

  await validate(articleIdShema, { articleId });

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
};

const commentArticle = async (req, res) => {
  const articleId = parseInt(req.params.id, 10);

  await validate(articleIdShema, { articleId });

  await validate(commentSchema, req.body);

  const fields = req.body.comment;

  const userId = await gettUserId(req);

  const result = await db.query(findArticleByIdQuery, [articleId]);

  const article = await searchAtrribute(result, 'article');


  const value = [userId, fields, articleId];

  const { rows } = await db.query(commentArticleQuery, value);

  const data = {
    message: 'Comment successfully created',
    articleTitle: article.title,
    article: article.article,
    comment: rows[0].comment,
    createdOn: rows[0].created_on,
    commentID: rows[0].comment_id,
  };

  return res.status(201).json({
    status: 'success',
    data,
  });
};

const GetArticlebyId = async (req, res) => {
  const articleId = parseInt(req.params.id, 10);

  await validate(articleIdShema, { articleId });

  const articles = await db.query(findArticleByIdQuery, [articleId]);

  await searchAtrribute(articles, 'article');

  const comments = await db.query(getAllArticleCommentById, [articleId]);

  const formatedArticle = await formatData(articles, 'articles');

  const formatedComment = await formatData(comments, 'comments');

  const data = {
    ...formatedArticle[0],
    comments: [...formatedComment],
  };

  return res.status(201).json({
    status: 'success',
    data,
  });
};

const flagArticle = async (req, res) => {
  const articleId = parseInt(req.params.id, 10);

  await validate(articleIdShema, { articleId });

  await validate(flagShema, req.body);

  const fields = req.body.flag;

  const userId = await gettUserId(req);

  const result = await db.query(findArticleByIdQuery, [articleId]);

  const article = await searchAtrribute(result, 'article');

  const value = [userId, fields, articleId];

  const flag = await db.query(flagArticleQuery, value);

  const formatedArticle = await formatData(flag, 'flag');

  const data = {
    message: 'article flag successfully',
    ...formatedArticle[0],
    articleTitle: article.title,
    article: article.article,
  };

  return res.status(201).json({
    status: 'success',
    data,
  });
};

module.exports = {
  postArticle,
  editArticle,
  deleteArticle,
  commentArticle,
  GetArticlebyId,
  flagArticle,
};
