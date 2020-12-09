const request = require('supertest');
const app = require('../app');
const ShortUrl = require('../models/url');
const mongoose = require('mongoose');

const url_initial = {
  full: 'https://www.google.co.in/',
  short: 'http://localhost:5000/12345',
};

beforeAll(async () => {
  await ShortUrl.deleteMany();
  await new ShortUrl(url_initial).save();
});

afterAll((done) => {
  // Closing the DB connection allows Jest to exit successfully.
  mongoose.connection.close();
  done();
});

// TEST: POST /shortUrls
test('should create new short link', async () => {
  await request(app)
    .post('/shortUrls')
    .type('json')
    .set('host', 'localhost:5000')
    .send({
      fullUrl: 'https://www.google.co.in/',
    })
    .expect(201);
});

// TEST: POST /shortUrlsCustom
test('should not create new short link for existing custom-code', async () => {
  await request(app)
    .post('/shortUrlsCustom')
    .type('json')
    .set('host', 'localhost:5000')
    .send({
      fullUrl: 'https://www.google.co.in/',
      fullUrlCustom: '12345',
    })
    .expect(400);
});

// TEST: GET /:shortUrl
test('should Redirect with unique link', async () => {
  await request(app)
    .get('/12345')
    .type('json')
    .set('host', 'localhost:5000')
    .expect(302);
});

// TEST: GET /:shortUrl/asstt;
test('should get stats', async () => {
  await request(app)
    .get('/12345/stats')
    .type('json')
    .set('host', 'localhost:5000')
    .expect(200);
});
