import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from "./user.service";
import { ResultCode } from '../../../../core/response/result.code';
import { ApiResponse } from '../../../../core/response/api.response';


describe('UserService', () => {
  let userService: UserService;

  // 각 테스트 실행 전에 UserService 인스턴스 생성
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  it('to be defined', async () => {
    expect(userService).toBeDefined();
  });

  it('요청 성공', async () => {
    // When
    const response = await userService.getUsers();

    // Then
    expect(response.resultCode).toBe(ResultCode.SUCCESS);
    expect(response.data).toBe('Hello World!');
  });

  it('특정 에러 코드에 대해 올바른 에러 메시지를 반환하는지 확인', () => {
    // Given
    const errorCode = ResultCode.ERR_FAIL;

    // When
    const response = ApiResponse.error(errorCode);

    // Then
    expect(response.resultCode).toBe(ResultCode.ERR_FAIL);
    expect(response.error).toBeDefined();
  });

  it('요청 성공시 undefined 또는 null 값 처리 확인', async () => {
    // When
    const response = await userService.getUsers();

    // Then
    expect(response.resultCode).toBe(ResultCode.SUCCESS);
    expect(response.data).not.toBeNull();
    expect(response.data).not.toBeUndefined();
  });

});