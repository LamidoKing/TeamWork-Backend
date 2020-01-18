const { formatData, sortData } = require('../utils');
const db = require('../db');
const { getAllArticles, getAllGifs } = require('../queries');

require('dotenv').config();

const getFeed = async (req, res) => {
  const articles = await db.query(getAllArticles);
  const gifs = await db.query(getAllGifs);

  const formatedArticles = await formatData(articles, 'articles');

  const formatedGifs = await formatData(gifs, 'gifs');
  const data = [...formatedArticles, ...formatedGifs];

  const sortedData = await sortData(data);

  return res.status(200).json({
    status: 'success',
    data: sortedData,
  });
};

module.exports = {
  getFeed,
};
