// tests/integration/api.test.js
const request = require('supertest');
const app = require('../../src/app');

describe('API Integration', () => {
  it('should return 404 for unknown route', async () => {
    const res = await request(app).get('/unknown');
    expect(res.statusCode).toEqual(404);
  });
});
