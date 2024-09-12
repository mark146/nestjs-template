import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from '@/storage/db/typeorm/mariadb/v1/user/user.repository';
import { IUserRepository } from '@/domain/v1/user/user.repository.interface';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    { provide: IUserRepository, useClass: UserRepository },
  ]
})
export class UserModule {}