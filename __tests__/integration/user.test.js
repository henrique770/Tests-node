import request from 'supertest';
import app from '../../src/app';

import truncate from '../util/truncate';

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });
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

  it('não deve ser capaz de registrar email já criado ', async () => {
    await request(app)
      .post('/users')
      .send({
        name: 'Henrique Leal',
        email: 'henrique.1360@gmail.com',
        password_hash: '123456',
      });
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Henrique Leal',
        email: 'henrique.1360@gmail.com',
        password_hash: '123456',
      });

    expect(response.status).toBe(400);
  });
});
