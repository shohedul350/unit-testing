import request from 'supertest';
import app from '../src/app';

describe('app test suite', () => {
  test('my firt test', async () => {
    console.log('my firt test');
  });
  test('get all user test', async () => {
    console.log('get all user test start');
    const response = await request(app).get('/users');
    expect(response.statusCode).toBe(200);
    // console.log(response.body);
  });
});
