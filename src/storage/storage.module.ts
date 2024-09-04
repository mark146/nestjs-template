import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MariadbDataSource } from '@/storage/db/typeorm/datasources/mariadb.datasource';

@Module({
  providers: [
    ConfigService,
    MariadbDataSource,
  ],
})
export class StorageModule {}