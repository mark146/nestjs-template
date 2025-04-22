// storage.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmDatabaseModule } from '@/storage/db/typeorm/typeorm.module';
import { UserRepository } from '@/storage/db/typeorm/mariadb/v1/user/user.repository';
import { IUserRepository } from '@/domain/v1/user/user.repository.interface';

@Module({
  imports: [
    TypeOrmDatabaseModule,
  ],
  providers: [
    UserRepository,
    {
      provide: IUserRepository,
      useClass: UserRepository,
    }
  ],
  exports: [IUserRepository],
})
export class StorageModule {}