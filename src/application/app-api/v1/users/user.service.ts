import { Inject, Injectable } from '@nestjs/common';
import { GetUsersRequest } from './request/get-users.request';
import { IUserRepository } from '@/domain/v1/user/user.repository.interface';
import { User } from '@/domain/v1/user/user.domain';
import { PaginatedResult } from '@/core/interfaces/paginated-result.interface';

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
}
