import { INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import request from 'supertest';
import { App } from 'supertest/types';

export async function seedAdminUser(
  prisma: PrismaClient,
  overrides?: Partial<{
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
  }>,
) {
  const rawPassword = overrides?.password ?? 'admin-secret';

  return prisma.user.create({
    data: {
      email: overrides?.email ?? 'admin@example.com',
      password: rawPassword,
      firstName: overrides?.firstName ?? 'Admin',
      lastName: overrides?.lastName ?? 'User',
      dateOfBirth: new Date(
        overrides?.dateOfBirth ?? '1980-01-01T00:00:00.000Z',
      ),
      isAdmin: true,
    },
  });
}

export async function getAccessToken(
  app: INestApplication<App>,
  credentials?: Partial<{ email: string; password: string }>,
) {
  const response = await request(app.getHttpServer())
    .post('/auth/login')
    .send({
      email: credentials?.email ?? 'admin@example.com',
      password: credentials?.password ?? 'admin-secret',
    })
    .expect(201);

  return response.body.accessToken as string;
}
