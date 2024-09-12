import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { IUserRepository } from '@/domain/v1/user/user.repository.interface';
import { User } from '@/domain/v1/user/user.domain';
import { PaginatedResult } from '@/core/interfaces/paginated-result.interface';
import { TransactionalAdapterTypeOrm } from '@nestjs-cls/transactional-adapter-typeorm';
import { TransactionHost } from '@nestjs-cls/transactional';

@Injectable()
export class UserRepository implements IUserRepository {
  private readonly repository: Repository<UserEntity>;

  constructor(
    private readonly txHost: TransactionHost<TransactionalAdapterTypeOrm>
  ) {
    this.repository = this.txHost.tx.getRepository(UserEntity);
  }

  private mapToUser(entity: UserEntity): User {
    const { id, username, password } = entity;
    return new User.Builder()
      .setUsername(username)
      .setPassword(password)
      .setId(id)
      .build();
  }

  async findAll(page: number, limit: number): Promise<PaginatedResult<User>> {
    const [entities, total] = await this.repository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });

    const users = entities.map((user: UserEntity) => this.mapToUser(user))
    const totalPages = Math.ceil(total / limit);

    return {
      data: users,
      meta: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages
      }
    };
  }

  async create(user: User): Promise<void> {
    const entity = new UserEntity();
    Object.assign(entity, user);
    await this.repository.save(entity);
  }
}