import { Inject, Injectable } from '@nestjs/common';
import { GetUsersRequest } from './request/get-users.request';
import { IUserRepository } from '@/domain/v1/user/user.repository.interface';
import { User } from '@/domain/v1/user/user.domain';
import { PaginatedResult } from '@/core/interfaces/paginated-result.interface';
import { Transactional } from '@nestjs-cls/transactional';
import { CreateUserRequest } from '@/application/app-api/v1/users/request/create-user.request';
import { GetUsersResponse } from '@/application/app-api/v1/users/response/get-users.response';

@Injectable()
export class UserService {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository
  ) {}

  async getUsers(request: GetUsersRequest): Promise<PaginatedResult<GetUsersResponse>>  {
    const { page, limit }= request;

    const usersResult = await this.userRepository.findAll(page, limit);
    const usersResponses = usersResult.data.map(user => GetUsersResponse.fromDomain(user));

    return {
      data: usersResponses,
      meta: usersResult.meta
    };
  }

  @Transactional()
  async createUser(request: CreateUserRequest): Promise<void> {
    const { username, password } = request;

    const user = User.builder().setUsername(username).setPassword(password).build();

    await this.userRepository.create(user);
  }
}
