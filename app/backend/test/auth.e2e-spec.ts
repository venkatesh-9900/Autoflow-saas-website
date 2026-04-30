/* eslint-disable */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/auth/register (POST) - should register a new owner user', () => {
    return request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: 'testowner@autoflow.ai',
        password: 'securepassword123',
        name: 'Test Owner'
      })
      .expect(201)
      .expect((res: any) => {
        expect(res.body.access_token).toBeDefined();
        expect(res.body.user.email).toBe('testowner@autoflow.ai');
        expect(res.body.user.role).toBe('OWNER');
      });
  });

  it('/auth/login (POST) - should login the user', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'testowner@autoflow.ai',
        password: 'securepassword123',
      })
      .expect(200)
      .expect((res: any) => {
        expect(res.body.access_token).toBeDefined();
        expect(res.body.user.email).toBe('testowner@autoflow.ai');
      });
  });
});
