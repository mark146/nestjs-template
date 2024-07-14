import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/users/ (GET)', async () => {
    await request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect({
        "resultCode":"0000",
        "message":"Success",
        "data":"Hello World!"
      });
  });
});