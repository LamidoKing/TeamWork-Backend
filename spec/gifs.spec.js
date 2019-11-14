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

let gif;
let comment;

beforeEach((done) => {
  baseUrl = 'http://localhost:3000/api/v1/';
  gif = {
    gifId: 1,
    image: 'image/gif',
    title: 'name',
    imageUrl: 'dhjhj',
    createOn: '12/12/2019',
  };
  comment = {
    commentId: 1,
    authorId: 1,
    comment: 'gskghfsudghfisdflsijbjd',
  };
  done();
});


describe('Gifs Endpoints', () => {
  it('POST / gifs', (done) => {
    frisby
      .post(`${baseUrl}gifs`, auth, gif)
      .expect('status', 201)
      .expect('json', {
        status: 'success',
      })
      .expect('jsonTypes', 'data', {
        message: Joi.string().required(),
        gifId: Joi.number().required(),
        title: Joi.string().required(),
        gifUrl: Joi.string().required(),
        createOn: Joi.date().required(),
      });
    done();
  });

  it('POST / gifs/:id/comment', (done) => {
    frisby
      .post(`${baseUrl}gifs/:id ${gif.gifId}/comment`, auth, { comment: comment.comment })
      .expect('status', 201)
      .expect('json', {
        status: 'success',
      })
      .expect('jsonTypes', 'data', {
        message: Joi.string().required(),
        title: Joi.string().required(),
        createOn: Joi.date().required(),
        comment: Joi.string().required(),
      });
    done();
  });

  it('DELETE / gifs/:id', (done) => {
    frisby
      .del(`${baseUrl}gifs/:${gif.gifId}`, auth)
      .expect('status', 200)
      .expect('json', {
        status: 'success',

      })
      .expect('jsonTypes', 'data', {
        message: Joi.string().required(),
      });
    done();
  });

  it('GET / gifs/:id', (done) => {
    frisby
      .get(`${baseUrl}gifs/:${gif.gifId}`, auth)
      .expect('status', 200)
      .expect('json', {
        status: 'success',
      })
      .expect('jsonTypes', 'data', {
        gifId: Joi.number().required(),
        title: Joi.string().required(),
        imageUrl: Joi.string().required(),
        comment: Joi.array().required(),
      });
    done();
  });
});
