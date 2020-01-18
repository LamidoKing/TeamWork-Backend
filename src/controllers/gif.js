const { processGifToUrl, formatData, gettUserId } = require('../utils');
const { searchAtrribute } = require('../auth');
const db = require('../db');
const {
  postGifQuery,
  findGifByIdQuery,
  deleteGifQuery,
  commentGifQuery,
  getAllGifCommentById,
  flagGifQuery,
} = require('../queries');
const {
  gifSchema,
  gifIdShema,
  commentSchema,
  flagShema,
  validate,
} = require('../validation');

require('dotenv').config();

const postGif = async (req, res) => {
  await validate(gifSchema, {
    title: req.body.title,
    file: req.file,
    mimetype: req.file ? req.file.mimetype : '',
  });

  const { title } = req.body;

  const userId = await gettUserId(req);

  const url = await processGifToUrl(req);

  const value = [title, userId, url];

  const { rows } = await db.query(postGifQuery, value);

  const data = {
    message: 'GIF image successfully posted',
    userId: rows[0].user_id,
    gifId: rows[0].gifid,
    title: rows[0].title,
    gifUrl: rows[0].gif_url,
    createdOn: rows[0].created_on,
  };
  return res.status(201).json({
    status: 'success',
    data,
  });
};

const deleteGif = async (req, res) => {
  const gifId = parseInt(req.params.id, 10);

  await validate(gifIdShema, { gifId });

  const result = await db.query(findGifByIdQuery, [gifId]);

  await searchAtrribute(result, 'gif');

  const value = [gifId];

  await db.query(deleteGifQuery, value);

  const data = {
    message: 'gif post successfully deleted',
  };

  return res.status(200).json({
    status: 'success',
    data,
  });
};

const commentGif = async (req, res) => {
  const gifId = parseInt(req.params.id, 10);

  await validate(gifIdShema, { gifId });

  await validate(commentSchema, req.body);

  const fields = req.body.comment;

  const userId = await gettUserId(req);

  const result = await db.query(findGifByIdQuery, [gifId]);

  const gif = await searchAtrribute(result, 'gif');

  const value = [userId, fields, gifId];

  const { rows } = await db.query(commentGifQuery, value);

  const data = {
    message: 'comment successfully created',
    gifTitle: gif.title,
    comment: rows[0].comment,
    createdOn: rows[0].created_on,
    commentID: rows[0].comment_id,
  };

  return res.status(201).json({
    status: 'success',
    data,
  });
};

const getGifbyId = async (req, res) => {
  const gifId = parseInt(req.params.id, 10);

  await validate(gifIdShema, { gifId });

  const gifs = await db.query(findGifByIdQuery, [gifId]);

  await searchAtrribute(gifs, 'gif');

  const comments = await db.query(getAllGifCommentById, [gifId]);

  const formatedGifs = await formatData(gifs, 'gifs');

  const formatedComment = await formatData(comments, 'comments');


  const data = {
    ...formatedGifs[0],
    comments: [...formatedComment],
  };

  return res.status(200).json({
    status: 'success',
    data,
  });
};

const flagGif = async (req, res) => {
  const gifId = parseInt(req.params.id, 10);

  await validate(gifIdShema, { gifId });

  await validate(flagShema, req.body);

  const fields = req.body.flag;

  const userId = await gettUserId(req);

  const result = await db.query(findGifByIdQuery, [gifId]);

  const gif = await searchAtrribute(result, 'gif');

  const value = [userId, fields, gifId];

  const flag = await db.query(flagGifQuery, value);

  const formatedFlag = await formatData(flag, 'flag');

  const data = {
    message: 'gif flag  successfully',
    ...formatedFlag[0],
    gifTitle: gif.title,
    gifUrl: gif.gif_url,
  };

  return res.status(201).json({
    status: 'success',
    data,
  });
};


module.exports = {
  postGif,
  deleteGif,
  commentGif,
  getGifbyId,
  flagGif,
};
