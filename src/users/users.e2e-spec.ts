import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../app.module';
import { getAccessToken, seedAdminUser } from '../auth/test-auth.helper';

describe('UsersController (e2e)', () => {
  let app: INestApplication<App>;
  let prisma: PrismaClient;
  let accessToken: string;

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

    await seedAdminUser(prisma);
    accessToken = await getAccessToken(app);
  });

  afterEach(async () => {
    if (app) {
      await app.close();
    }
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('/users (POST) creates a user', async () => {
    const payload = {
      email: 'john@example.com',
      password: 'secret',
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: '1990-01-01T00:00:00.000Z',
      isAdmin: true,
    };

    const response = await request(app.getHttpServer())
      .post('/users')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(payload)
      .expect(201);

    expect(response.body).toEqual(
      expect.objectContaining({
        email: payload.email,
        firstName: payload.firstName,
        lastName: payload.lastName,
        isAdmin: true,
      }),
    );
    expect(response.body.password).toBeUndefined();
  });

  it('/users (POST) returns 409 for duplicate email', async () => {
    const payload = {
      email: 'duplicate@example.com',
      password: 'secret',
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: '1990-01-01T00:00:00.000Z',
    };

    await request(app.getHttpServer())
      .post('/users')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(payload)
      .expect(201);

    await request(app.getHttpServer())
      .post('/users')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(payload)
      .expect(409);
  });

  it('/users (GET) lists users', async () => {
    await prisma.user.create({
      data: {
        email: 'jane@example.com',
        password: 'secret',
        firstName: 'Jane',
        lastName: 'Smith',
        dateOfBirth: new Date('1992-05-10T00:00:00.000Z'),
      },
    });

    const response = await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    expect(response.body).toHaveLength(2);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          email: 'jane@example.com',
          firstName: 'Jane',
          lastName: 'Smith',
          isAdmin: false,
        }),
      ]),
    );
  });

  it('/users/:id (GET) returns 404 when missing', async () => {
    await request(app.getHttpServer())
      .get('/users/non-existent-id')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(404);
  });

  it('/users/:id (PATCH) updates a user', async () => {
    const createdUser = await prisma.user.create({
      data: {
        email: 'before@example.com',
        password: 'secret',
        firstName: 'Before',
        lastName: 'Name',
        dateOfBirth: new Date('1988-01-01T00:00:00.000Z'),
      },
    });

    const response = await request(app.getHttpServer())
      .patch(`/users/${createdUser.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        firstName: 'After',
        isAdmin: true,
      })
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        id: createdUser.id,
        firstName: 'After',
        isAdmin: true,
      }),
    );
  });

  it('/users/:id (DELETE) deletes a user', async () => {
    const createdUser = await prisma.user.create({
      data: {
        email: 'delete-me@example.com',
        password: 'secret',
        firstName: 'Delete',
        lastName: 'Me',
        dateOfBirth: new Date('1985-03-20T00:00:00.000Z'),
      },
    });

    await request(app.getHttpServer())
      .delete(`/users/${createdUser.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)
      .expect({
        message: `User with id ${createdUser.id} deleted`,
      });

    await request(app.getHttpServer())
      .get(`/users/${createdUser.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(404);
  });

  it('/users (GET) returns 401 without token', async () => {
    await request(app.getHttpServer()).get('/users').expect(401);
  });
});
