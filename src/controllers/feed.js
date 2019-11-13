const { formatData, sortData } = require('../utils');
const db = require('../db');
const { getAllArticles, getAllGifs } = require('../queries');

require('dotenv').config();

const getFeed = async (req, res, next) => {
  try {
    const articles = await db.query(getAllArticles);
    const gifs = await db.query(getAllGifs);

    const formatedArticles = await formatData(articles, 'articles');

    const formatedGifs = await formatData(gifs, 'gifs');
    const data = [...formatedArticles, ...formatedGifs];

    const sortedData = await sortData(data);

    res.status(201).json({
      status: 'success',
      data: sortedData,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      error,
    });
  }
};

module.exports = {
  getFeed,
};
