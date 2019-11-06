const frisby = require('frisby');

const { Joi } = frisby;

frisby.globalSetup({
  request: {
    headers: {
      Authorization: `Basic ${Buffer.from('username:password').toString('base64')}`,
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
    email: 'lamdio@dfghf.com',
    password: 'fhghdkh',
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
      .post(`${baseUrl}/create-user`, user)
      .expect('status', 201)
      .expect('json', {
        status: 'success',
      })
      .expect('jsonTypes', 'data', {
        message: Joi.string().required(),
        token: Joi.string().required(),
        userId: Joi.number().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
        gender: Joi.string().required(),
        jobRole: Joi.string().required(),
        department: Joi.string().required(),
        address: Joi.string().required(),
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
