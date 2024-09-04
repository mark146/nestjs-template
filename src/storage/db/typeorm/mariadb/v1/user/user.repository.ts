import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { IUserRepository } from '@/domain/v1/user/user.repository.interface';
import { MariadbDataSource } from '@/storage/db/typeorm/datasources/mariadb.datasource';
import { User } from '@/domain/v1/user/user.domain';
import { PaginatedResult } from '@/core/interfaces/paginated-result.interface';

@Injectable()
export class UserRepository implements IUserRepository {
  private readonly repository: Repository<UserEntity>;

  constructor(
    private readonly dataSource: MariadbDataSource
  ) {
    this.repository = this.dataSource.getRepository(UserEntity);
  }

  private mapToUser(entity: UserEntity): User {
    const { id, username, password } = entity;
    return new User(id, username, password);
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
        page,
        limit,
        totalPages
      }
    };
  }
}