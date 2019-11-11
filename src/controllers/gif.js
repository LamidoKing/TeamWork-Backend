const { gettUserId, processGifToUrl } = require('../utils');
const db = require('../db');
const { postGifQuery } = require('../queries');

require('dotenv').config();

const postGif = async (req, res, next) => {
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
      gifId: rows[0].gif_id,
      userId: rows[0].user_id,
      title: rows[0].title,
      gifUrl: rows[0].gif_url,
      createdOn: rows[0].created_on,
    };
    res.status(201).json({
      status: 'success',
      data,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'err',
      error,
    });
  }
};

module.exports = {
  postGif,
};
