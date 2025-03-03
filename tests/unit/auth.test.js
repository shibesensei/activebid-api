// tests/unit/auth.test.js
const request = require('supertest');
const app = require('../../src/app');

describe('Auth Endpoints', () => {
  it('should register a user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body.user).toHaveProperty('id');
  });

  it('should login a user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });
});
