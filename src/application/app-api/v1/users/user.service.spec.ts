import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { IUserRepository } from '@/domain/v1/user/user.repository.interface';
import { User } from '@/domain/v1/user/user.domain';
import { GetUsersRequest } from './request/get-users.request';
import { PaginatedResult } from '@/core/interfaces/paginated-result.interface';

jest.mock('@nestjs-cls/transactional', () => ({
  Transactional: () => () => ({}),
  TransactionHost: jest.fn().mockImplementation(() => ({
    tx: {
      getRepository: jest.fn(),
    },
    withTransaction: jest.fn().mockImplementation(async (callback) => {
      return await callback();
    }),
  })),
}));

describe('UserService', () => {
  let userService: UserService;
  let userRepository: jest.Mocked<IUserRepository>;

  beforeEach(async () => {
    const mockUserRepository: jest.Mocked<IUserRepository> = {
      findAll: jest.fn(),
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: IUserRepository,
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get(IUserRepository) as jest.Mocked<IUserRepository>;
  });

  describe('getUsers', () => {
    it('유저 목록을 조회 한다', async () => {
      // Given
      const request = new GetUsersRequest();
      request.page = 1;
      request.limit = 10;

      const mockUsers: User[] = [
        User.builder().setId(1n).setUsername('user1').setPassword('password1').build(),
        User.builder().setId(2n).setUsername('user2').setPassword('password2').build()
      ];

      const mockResult: PaginatedResult<User> = {
        data: mockUsers,
        meta: {
          total: 2,
          page: 1,
          limit: 10,
          totalPages: 1,
        },
      };

      userRepository.findAll.mockResolvedValue(mockResult);

      // When
      const result = await userService.getUsers(request);

      // Then
      expect(userRepository.findAll).toHaveBeenCalledWith(1, 10);
      expect(result.data.length).toBe(2);
      expect(result.meta).toEqual(mockResult.meta);
    });
  });

  describe('createUser', () => {
    it('새로운 유저를 생성 한다', async () => {
      // Given
      const request = {
        username: 'newuser',
        password: 'newpassword',
      };

      const user = User.builder().setUsername(request.username).setPassword(request.password).build();

      // When
      await userService.createUser(request);

      // Then
      expect(userRepository.create).toHaveBeenCalledWith(user);
    });
  });
});