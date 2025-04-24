import { ClsPluginTransactional } from '@nestjs-cls/transactional';
import { TransactionalAdapterTypeOrm } from '@nestjs-cls/transactional-adapter-typeorm';
import { DataSource } from 'typeorm';

export const TypeOrmClsPluginConfig = new ClsPluginTransactional({
  adapter: new TransactionalAdapterTypeOrm({
    dataSourceToken: DataSource,
  }),
});