import { Inject, Injectable } from '@nestjs/common';
import { GetUsersRequest } from './request/get-users.request';
import { IUserRepository } from '@/domain/v1/user/user.repository.interface';
import { User } from '@/domain/v1/user/user.domain';
import { PaginatedResult } from '@/core/interfaces/paginated-result.interface';
import { Transactional } from '@nestjs-cls/transactional';
import { CreateUserRequest } from '@/application/app-api/v1/users/request/create-user.request';

@Injectable()
export class UserService {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository
  ) {}

  async getUsers(request: GetUsersRequest): Promise<PaginatedResult<User>>  {
    const { page, limit }= request;
    return this.userRepository.findAll(page, limit)
  }

  @Transactional()
  async createUser(request: CreateUserRequest): Promise<undefined> {
    const { username, password } = request;
    const user = new User.Builder()
      .setUsername(username)
      .setPassword(password)
      .build();

    await this.userRepository.create(user);
  }
}
