import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../app.module';
import { getAccessToken, seedAdminUser } from './test-auth.helper';

describe('AuthController (e2e)', () => {
  let app: INestApplication<App>;
  let prisma: PrismaClient;

  beforeAll(async () => {
    prisma = new PrismaClient();
    await prisma.$connect();
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    await prisma.timeTracker.deleteMany();
    await prisma.user.deleteMany();
  });

  afterEach(async () => {
    if (app) {
      await app.close();
    }
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('/auth/login (POST) returns access token for valid credentials', async () => {
    const password = 'secret-password';
    await prisma.user.create({
      data: {
        email: 'login-user@example.com',
        password,
        firstName: 'Login',
        lastName: 'User',
        dateOfBirth: new Date('1990-01-01T00:00:00.000Z'),
      },
    });

    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'login-user@example.com', password })
      .expect(201);

    expect(response.body).toEqual(
      expect.objectContaining({
        accessToken: expect.any(String),
        user: expect.objectContaining({
          email: 'login-user@example.com',
        }),
      }),
    );
  });

  it('/auth/login (POST) returns 401 for invalid credentials', async () => {
    await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'nope@example.com', password: 'wrong' })
      .expect(401);
  });

  it('/auth/register (POST) requires authentication', async () => {
    await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: 'new-user@example.com',
        password: 'secret',
        firstName: 'New',
        lastName: 'User',
        dateOfBirth: '1990-01-01T00:00:00.000Z',
      })
      .expect(401);
  });

  it('/auth/register (POST) allows admin to create users', async () => {
    await seedAdminUser(prisma);
    const adminToken = await getAccessToken(app);

    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        email: 'new-user@example.com',
        password: 'secret',
        firstName: 'New',
        lastName: 'User',
        dateOfBirth: '1990-01-01T00:00:00.000Z',
      })
      .expect(201);

    expect(response.body).toEqual(
      expect.objectContaining({
        email: 'new-user@example.com',
        isAdmin: false,
      }),
    );
    expect(response.body.password).toBeUndefined();
  });

  it('/auth/register (POST) rejects non-admin users', async () => {
    const userPassword = 'member-password';
    await prisma.user.create({
      data: {
        email: 'member@example.com',
        password: userPassword,
        firstName: 'Member',
        lastName: 'User',
        dateOfBirth: new Date('1990-01-01T00:00:00.000Z'),
        isAdmin: false,
      },
    });

    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'member@example.com', password: userPassword })
      .expect(201);

    await request(app.getHttpServer())
      .post('/auth/register')
      .set('Authorization', `Bearer ${loginResponse.body.accessToken}`)
      .send({
        email: 'blocked-user@example.com',
        password: 'secret',
        firstName: 'Blocked',
        lastName: 'User',
        dateOfBirth: '1990-01-01T00:00:00.000Z',
      })
      .expect(403);
  });
});
