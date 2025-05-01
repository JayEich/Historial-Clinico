import request from 'supertest';
import app from '../src/app';
import { AppDataSource } from '../src/config/data-source';

//Pa iniciar la base de datos porque sino no me deja correr los test
beforeAll(async () => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
});

//La prueba
describe('POST /auth/register', () => {
  it('debe registrar un nuevo usuario', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        email: `test${Date.now()}@pruebita.com`,
        password: '4488123lacolmenaexpress'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('email');
  });
});
