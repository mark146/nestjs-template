import { User } from './user.domain';
import { PaginatedResult } from '@/core/interfaces/paginated-result.interface';

export interface IUserRepository {
  findAll(page: number, limit: number): Promise<PaginatedResult<User>>;
}

export const IUserRepository = Symbol('IUserRepository');