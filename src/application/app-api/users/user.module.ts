import { Module } from '@nestjs/common';
import { UserController } from './controller/v1/user.controller';
import { UserService } from './service/user.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserModule],
})
export class UserModule {}
