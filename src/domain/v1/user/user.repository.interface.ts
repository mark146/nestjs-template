import { User } from './user.domain';
import { PaginatedResult } from '@/core/interfaces/paginated-result.interface';

export const IUserRepository = Symbol('IUserRepository');

export interface IUserRepository {
  findAll(page:number, limit: number): Promise<PaginatedResult<User>>;
  create(user: User): Promise<void>;
}
