import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from '@/storage/db/typeorm/mariadb/v1/user/user.repository';
import { MariadbDataSource } from '@/storage/db/typeorm/datasources/mariadb.datasource';
import { StorageModule } from '@/storage/storage.module';
import { IUserRepository } from '@/domain/v1/user/user.repository.interface';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    MariadbDataSource,
    { provide: IUserRepository, useClass: UserRepository },
    StorageModule
  ],
})
export class UserModule {}