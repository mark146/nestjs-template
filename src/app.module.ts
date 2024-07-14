import { Module } from '@nestjs/common';
import { UserModule } from './application/app-api/users/user.module';


@Module({
  imports: [
    UserModule,
  ],
})

export class AppModule {}
