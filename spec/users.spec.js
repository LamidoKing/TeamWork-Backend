const frisby = require('frisby');

const { Joi } = frisby;

const { auth } = require('../src/middleware');

frisby.globalSetup({
  request: {
    headers: {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjgsInJvbGVudW1iZXIiOiIxOTE5IiwiaWF0IjoxNTczNzMxNjIxLCJleHAiOjE1NzM4MTgwMjF9.4_KeXG7NQ4MPGmxLH3WYthpBWRmgRDUe8tRP5qPPcwc',
      'Content-Type': 'application/json',
    },
  },
});

let baseUrl;

let user;

beforeEach((done) => {
  baseUrl = 'http://localhost:3000/api/v1/auth/';
  user = {
    userId: 1,
    firstName: 'lmd',
    lastName: 'tj',
    email: 'andela@gmail.com',
    password: 'lamidotijjani',
    gender: 'male',
    jobRole: 'sfsf',
    department: 'sfsds',
    address: 'sfthf',
  };
  done();
});


describe('Auth APIs Endpoints', () => {
  it('POST / create-user', (done) => {
    frisby
      .post(`${baseUrl}create-user`, auth, user)
      .expect('status', 201)
      .expect('json', {
        status: 'success',
      })
      .expect('jsonTypes', 'data', {
        message: Joi.string().required(),
        token: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string(),
        userId: Joi.number().required(),
        firstName: Joi.string(),
        lastName: Joi.string(),
        gender: Joi.string(),
        jobRole: Joi.string(),
        address: Joi.string(),
      });
    done();
  });

  it('POST / signin, should signin', (done) => {
    frisby
      .post(`${baseUrl}signin`, { userId: user.userId, email: user.email, password: user.password })
      .expect('status', 201)
      .expect('json', {
        status: 'success',
      })
      .expect('jsonTypes', 'data', {
        token: Joi.string().required(),
        userId: Joi.number().required(),
      });
    done();
  });
});
