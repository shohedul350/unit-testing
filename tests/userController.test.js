import request from 'supertest';
import app from '../src/app';
import { getAllUsers } from '../src/services/userServices';

jest.mock('../src/services/userServices');

describe('userservices test Suite', () => {
  test('get all user should return an array of user', async () => {
    const response = await request(app).get('/users');
    expect(response.statusCode).toBe(200);
    const users = response.body
    expect(users.length).toBeGreaterThan(0);
    expect(users[0]._id).toBe('1');
  });
  test('post should return saved user', async () => {
    const user = {
      id: '03',
      userName: 'Emon',
      email: 'emon@gmail.com',
      address: 'Rangpur',
    };
    const response = await request(app).post('/users').send(user);
    expect(response.statusCode).toBe(201);
    const body = response.body;
    expect(body.length).toBe(24);
    const savedUserResponse = await request(app).get(`/users/'${body}`);
    const savedUser = savedUserResponse.body;
    expect(savedUser.username).toBe(user.username);
  });
});
