const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  info: {
    title: 'Teamwork API Documentation',
    version: '1.0.1',
    description: 'Demonstrating how to user Teamwork API ',
  },
  host: 'localhost:3000',
  basePath: '/api/v1',
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      scheme: 'bearer',
      in: 'header',
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ['./src/documentation/models/*.js', './src/documentation/routes/*.js'],
};
const swaggerSpec = swaggerJSDoc(options);

const apiDocs = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
};

module.exports = {
  swaggerSpec,
  apiDocs,
};
