import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionalAdapterTypeOrm } from '@nestjs-cls/transactional-adapter-typeorm';
import { TransactionHost } from '@nestjs-cls/transactional';

import { UserEntity } from './user.entity';
import { IUserRepository } from '@/domain/v1/user/user.repository.interface';
import { User } from '@/domain/v1/user/user.domain';
import { PaginatedResult } from '@/core/interfaces/paginated-result.interface';
import { PaginationUtils } from '@/core/utils/pagination.utils';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntityRepository: Repository<UserEntity>,
    private readonly txHost: TransactionHost<TransactionalAdapterTypeOrm>
  ) {}

  /**
   * 현재 트랜잭션 컨텍스트에 맞는 레포지토리 반환
   * 트랜잭션이 활성화된 경우 트랜잭션 컨텍스트의 레포지토리 사용
   */
  private get repository(): Repository<UserEntity> {
    return this.txHost.isTransactionActive()
      ? this.txHost.tx.getRepository(UserEntity)
      : this.userEntityRepository;
  }

  /**
   * 엔티티를 도메인 객체로 변환
   * @param entity TypeORM 엔티티
   * @returns 도메인 모델 객체
   */
  private mapToUser(entity: UserEntity): User {
    const { id, username, password } = entity;
    return User.builder()
      .setUsername(username)
      .setPassword(password)
      .setId(id)
      .build();
  }

  /**
   * 페이지네이션된 사용자 목록 조회
   * @param page 현재 페이지
   * @param limit 페이지당 항목 수
   * @returns 페이지네이션된 사용자 목록
   */
  async findAll(page: number, limit: number): Promise<PaginatedResult<User>> {
    const offset = PaginationUtils.calculateOffset(page, limit);

    const [entities, total] = await this.repository.findAndCount({
      skip: offset,
      take: limit,
    });

    const users = entities.map((entity: UserEntity) => this.mapToUser(entity));

    return PaginationUtils.createPaginatedResult(users, total, page, limit);
  }

  /**
   * 새 사용자 생성
   * @param user 생성할 사용자 도메인 객체
   */
  async create(user: User): Promise<void> {
    const entity = new UserEntity();
    entity.username = user.getUsername();
    entity.password = user.getPassword();

    await this.repository.save(entity);
  }
}