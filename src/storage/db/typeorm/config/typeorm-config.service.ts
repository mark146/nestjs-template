import { TypeOrmModule } from '@nestjs/typeorm';
import { ClsPluginTransactional } from '@nestjs-cls/transactional';
import { TransactionalAdapterTypeOrm } from '@nestjs-cls/transactional-adapter-typeorm';
import { DataSource } from 'typeorm';
import { UserEntity } from '@/storage/db/typeorm/mariadb/v1/user/user.entity';

export const TypeOrmClsPluginConfig = new ClsPluginTransactional({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  adapter: new TransactionalAdapterTypeOrm({
    dataSourceToken: DataSource,
  }),
});