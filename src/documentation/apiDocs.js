const swaggerUi = require('swagger-ui-express');

const { swaggerSpec } = require('../controllers/apiDocs');

const { serve } = swaggerUi;

const options = {
  explorer: true,
};


const documentation = swaggerUi.setup(swaggerSpec, options);

module.exports = {
  documentation,
  serve,
};
