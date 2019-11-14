const {
  gettUserId, processGifToUrl, searchAtrribute, validateInputsFields, formatData,
} = require('../utils');
const db = require('../db');
const {
  postGifQuery, findGifByIdQuery, deleteGifQuery,
  commentGifQuery, getAllGifCommentById, flagGifQuery,
} = require('../queries');

require('dotenv').config();

const postGif = async (req, res) => {
  try {
    const {
      title,
    } = req.body;

    const userId = await gettUserId(req);

    const url = await processGifToUrl(req);

    const value = [title, userId, url];

    const { rows } = await db.query(postGifQuery, value);

    const data = {
      message: 'GIF image successfully posted',
      gifId: rows[0].gifid,
      userId: rows[0].user_id,
      title: rows[0].title,
      gifUrl: rows[0].gif_url,
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

const deleteGif = async (req, res) => {
  try {
    const gifId = parseInt(req.params.id, 10);

    const result = await db.query(findGifByIdQuery, [gifId]);

    await searchAtrribute(result, 'gif');

    const value = [gifId];

    await db.query(deleteGifQuery, value);

    const data = {
      message: 'Gif successfully deleted',
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

const commentGif = async (req, res) => {
  try {
    const fields = {
      comment: req.body.comment,
    };

    await validateInputsFields(fields, 'gif');

    const gifId = parseInt(req.params.id, 10);

    const userId = await gettUserId(req);

    const result = await db.query(findGifByIdQuery, [gifId]);

    const gif = await searchAtrribute(result, 'gif');


    const value = [userId, fields.comment, gifId];

    const { rows } = await db.query(commentGifQuery, value);

    const data = {
      message: 'Comment successfully created',
      commentID: rows[0].comment_id,
      gifTitle: gif.title,
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

const getGifbyId = async (req, res) => {
  try {
    const gifId = parseInt(req.params.id, 10);

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
  } catch (error) {
    return res.status(400).json({
      status: 'error',
      error,
    });
  }
};

const flagGif = async (req, res) => {
  try {
    const fields = {
      flag: req.body.flag,
    };

    await validateInputsFields(fields, 'flag');

    const gifId = parseInt(req.params.id, 10);

    const userId = await gettUserId(req);

    const result = await db.query(findGifByIdQuery, [gifId]);

    const gif = await searchAtrribute(result, 'gif');

    const value = [userId, fields.flag, gifId];

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
  } catch (error) {
    return res.status(400).json({
      status: 'error',
      error,
    });
  }
};


module.exports = {
  postGif,
  deleteGif,
  commentGif,
  getGifbyId,
  flagGif,
};
