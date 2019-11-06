
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

let article;
let comment;

beforeEach((done) => {
  baseUrl = 'http://localhost:3000/api/v1/';
  article = {
    articleId: 1,
    title: 'name',
    article: 'hdfgkdfkghdfkhkdhf',
    create_on: '12/12/2019',
  };
  comment = {
    commentId: 1,
    authorId: 1,
    comment: 'gskghfsudghfisdflsijbjd',
  };
  done();
});


describe('Articles Endpoints', () => {
  it('POST / articles', (done) => {
    frisby
      .post(`${baseUrl}articles`, article)
      .expect('status', 201)
      .expect('json', {
        status: 'success',
      })
      .expect('jsonTypes', 'data', {
        message: Joi.string().required(),
        articleId: Joi.number().required(),
        title: Joi.string().required(),
        create_on: Joi.date().required(),
      });
    done();
  });

  it('PATCH / articles/:id', (done) => {
    frisby
      .put(`${baseUrl}articles/:${article.articleId}`, { title: article.title, article: article.article })
      .expect('status', 201)
      .expect('json', {
        status: 'success',
      })
      .expect('jsonTypes', 'data', {
        message: Joi.string().required(),
        title: Joi.string().required(),
        article: Joi.string().required(),
      });
    done();
  });

  it('POST / articles/:id/comment', (done) => {
    frisby
      .post(`${baseUrl}articles/:id ${article.articleId}/comment`, { comment: comment.comment })
      .expect('status', 201)
      .expect('json', {
        status: 'success',
      })
      .expect('jsonTypes', 'data', {
        message: Joi.string().required(),
        title: Joi.string().required(),
        article: Joi.string().required(),
        create_on: Joi.date().required(),
        comment: Joi.string().required(),
      });
    done();
  });

  it('DELETE / articles/:id', (done) => {
    frisby
      .del(`${baseUrl}articles/:${article.articleId}`)
      .expect('status', 200)
      .expect('json', {
        status: 'success',

      })
      .expect('jsonTypes', 'data', {
        message: Joi.string().required(),
      });
    done();
  });

  it('GET / articles/:id', (done) => {
    frisby
      .get(`${baseUrl}articles/:${article.articleId}`)
      .expect('status', 200)
      .expect('json', {
        status: 'success',
      })
      .expect('jsonTypes', 'data', {
        articleId: Joi.number().required(),
        title: Joi.string().required(),
        article: Joi.string().required(),
        comment: Joi.array().required(),
        create_on: Joi.date().required(),
      });
    done();
  });
});
