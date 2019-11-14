const frisby = require('frisby');

const { Joi } = frisby;
const { auth } = require('../src/middleware');

frisby.globalSetup({
  request: {
    headers: {
      Authorization: `Basic ${Buffer.from('username:password').toString('base64')}`,
      'Content-Type': 'application/json',
    },
  },
});

let baseUrl;

beforeEach((done) => {
  baseUrl = 'http://localhost:3000/api/v1/';
  done();
});


describe('Feed Endpoints', () => {
  it('GET / feed', (done) => {
    frisby
      .get(`${baseUrl}feed`, auth)
      .expect('status', 200)
      .expect('json', {
        status: 'success',
      })
      .expect('jsonTypes', {
        data: Joi.array().required(),
      });
    done();
  });
});
