const express = require('express');
const bodyParser = require('body-parser');
const { notFound, serverError } = require('./middleware');
const {
  userRoutes, gifRoutes, articleRoutes, feedRoutes, docsRoutes,
} = require('./routes');


const createApp = () => {
  const app = express();

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.use(bodyParser.json());

  app.use('/api/v1/auth', userRoutes);
  app.use('/api/v1', gifRoutes);
  app.use('/api/v1', articleRoutes);
  app.use('/api/v1', feedRoutes);
  app.use('/api/v1', docsRoutes);

  app.use(notFound);

  app.use(serverError);

  return app;
};

module.exports = createApp;
