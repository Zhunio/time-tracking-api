import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../app.module';
import { getAccessToken, seedAdminUser } from '../auth/test-auth.helper';

describe('TimeTrackersController (e2e)', () => {
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

  it('/time-trackers (POST) creates a time tracker', async () => {
    const user = await prisma.user.create({
      data: {
        email: 'tracker-owner@example.com',
        password: 'secret',
        firstName: 'Tracker',
        lastName: 'Owner',
        dateOfBirth: new Date('1990-01-01T00:00:00.000Z'),
      },
    });

    const payload = {
      userId: user.id,
      date: '2026-02-16T00:00:00.000Z',
      startTime: '09:00',
      endTime: '17:00',
    };

    const response = await request(app.getHttpServer())
      .post('/time-trackers')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(payload)
      .expect(201);

    expect(response.body).toEqual(
      expect.objectContaining({
        userId: user.id,
        startTime: '09:00',
        endTime: '17:00',
        user: expect.objectContaining({
          id: user.id,
          email: user.email,
        }),
      }),
    );
  });

  it('/time-trackers (POST) returns 404 for missing user', async () => {
    await request(app.getHttpServer())
      .post('/time-trackers')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        userId: 'missing-user-id',
        date: '2026-02-16T00:00:00.000Z',
        startTime: '09:00',
        endTime: '17:00',
      })
      .expect(404);
  });

  it('/time-trackers (GET) lists time trackers', async () => {
    const user = await prisma.user.create({
      data: {
        email: 'list-owner@example.com',
        password: 'secret',
        firstName: 'List',
        lastName: 'Owner',
        dateOfBirth: new Date('1990-01-01T00:00:00.000Z'),
      },
    });

    await prisma.timeTracker.create({
      data: {
        userId: user.id,
        date: new Date('2026-02-16T00:00:00.000Z'),
        startTime: '08:30',
        endTime: '16:30',
      },
    });

    const response = await request(app.getHttpServer())
      .get('/time-trackers')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    expect(response.body).toHaveLength(1);
    expect(response.body[0]).toEqual(
      expect.objectContaining({
        userId: user.id,
        startTime: '08:30',
        endTime: '16:30',
      }),
    );
  });

  it('/time-trackers/:id (GET) returns 404 when missing', async () => {
    await request(app.getHttpServer())
      .get('/time-trackers/non-existent-id')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(404);
  });

  it('/time-trackers/:id (PATCH) updates a time tracker', async () => {
    const user = await prisma.user.create({
      data: {
        email: 'update-owner@example.com',
        password: 'secret',
        firstName: 'Update',
        lastName: 'Owner',
        dateOfBirth: new Date('1990-01-01T00:00:00.000Z'),
      },
    });

    const timeTracker = await prisma.timeTracker.create({
      data: {
        userId: user.id,
        date: new Date('2026-02-16T00:00:00.000Z'),
        startTime: '09:00',
        endTime: '17:00',
      },
    });

    const response = await request(app.getHttpServer())
      .patch(`/time-trackers/${timeTracker.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        startTime: '10:00',
        endTime: '18:00',
      })
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        id: timeTracker.id,
        startTime: '10:00',
        endTime: '18:00',
      }),
    );
  });

  it('/time-trackers/:id (DELETE) deletes a time tracker', async () => {
    const user = await prisma.user.create({
      data: {
        email: 'delete-owner@example.com',
        password: 'secret',
        firstName: 'Delete',
        lastName: 'Owner',
        dateOfBirth: new Date('1990-01-01T00:00:00.000Z'),
      },
    });

    const timeTracker = await prisma.timeTracker.create({
      data: {
        userId: user.id,
        date: new Date('2026-02-16T00:00:00.000Z'),
        startTime: '09:00',
        endTime: '17:00',
      },
    });

    await request(app.getHttpServer())
      .delete(`/time-trackers/${timeTracker.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)
      .expect({ message: `Time tracker with id ${timeTracker.id} deleted` });

    await request(app.getHttpServer())
      .get(`/time-trackers/${timeTracker.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(404);
  });

  it('/time-trackers (GET) returns 401 without token', async () => {
    await request(app.getHttpServer()).get('/time-trackers').expect(401);
  });
});
