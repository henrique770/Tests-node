import request from 'supertest';
import bcrypt from 'bcryptjs';
import app from '../../src/app';

import User from '../../src/app/models/User';
import truncate from '../util/truncate';

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('deve criptografar a senha do usuário quando um novo usuário for criado', async () => {
    const user = await User.create({
      name: 'Henrique Leal',
      email: 'henrique.1360@gmail.com',
      password: '123456',
    });

    const compareHash = await bcrypt.compare('123456', user.password_hash);

    expect(compareHash).toBe(true);
  });

  it('deve ser possível se cadastrar', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Henrique Leal',
        email: 'henrique.1360@gmail.com',
        password: '123456',
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
        password: '123456',
      });
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Henrique Leal',
        email: 'henrique.1360@gmail.com',
        password: '123456',
      });

    expect(response.status).toBe(400);
  });
});
