import request from 'supertest';
import app from '../../src/app';

describe('User', () => {
  it('deve ser possível se cadastrar', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Henrique Leal',
        email: 'henrique.1360@gmail.com',
        password_hash: '123456',
      });
    // vai verificar se tem id
    expect(response.body).toHaveProperty('id');
  });
});