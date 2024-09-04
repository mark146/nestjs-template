import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '@/application/app-api/v1/users/user.module';
import { StorageModule } from '@/storage/storage.module';

function createConfigModule() {
  return ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true,
  });
}

@Module({
  imports: [
    createConfigModule(),
    UserModule,
    StorageModule,
  ],
})
export class AppModule {}