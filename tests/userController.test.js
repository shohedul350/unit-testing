import request from 'supertest';
import app from '../src/app';

jest.mock('../src/services/userServices');

describe('userservices test start', () => {
	  test('get all user test', async () => {
	 	console.log('get all user test start');
    const response = await request(app).get('/users');
		expect(response.statusCode).toBe(200);
		// console.log(response)
		const users = response.body
		expect(users.length).toBe(2);
		expect(users[0].id).toBe('1');
  });
});
