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
});
