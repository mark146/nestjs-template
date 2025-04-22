import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@/app.module';

describe('Users API (e2e)', () => {
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

  describe('GET /v1/users', () => {
    it('should return paginated list of users with proper structure', async () => {
      // When
      const response = await request(app.getHttpServer())
        .get('/v1/users')
        .expect(200);

      // Then - 기본 응답 구조 검증
      expect(response.body).toMatchObject({
        code: '0000',
        message: 'Success',
      });
      expect(Array.isArray(response.body.data)).toBe(true);

      // 메타데이터 구조 검증
      const { meta } = response.body;
      expect(meta).toMatchObject({
        total: expect.any(Number),
        page: expect.any(Number),
        limit: expect.any(Number),
        totalPages: expect.any(Number),
      });

      // 데이터 일관성 검증
      expect(meta.total).toBeGreaterThanOrEqual(0);
      expect(meta.page).toBeGreaterThanOrEqual(1);
      expect(meta.limit).toBeGreaterThan(0);

      // 데이터가 있는 경우에만 사용자 객체 구조 검증
      if (response.body.data.length > 0) {
        response.body.data.forEach(user => {
          expect(user).toMatchObject({
            id: expect.any(Number),
            username: expect.any(String),
            password: expect.any(String),
          });
        });
      }
    });
  });
});