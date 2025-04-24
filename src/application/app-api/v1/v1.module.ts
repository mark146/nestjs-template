import { Module } from '@nestjs/common';
import { UserModule } from '@/application/app-api/v1/users/user.module';
import { StorageModule } from '@/storage/storage.module';

@Module({
  imports: [UserModule, StorageModule],
})
export class V1Module {}