import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClsModule } from 'nestjs-cls';
import { TypeOrmClsPluginConfig } from '@/storage/db/typeorm/config/typeorm-config.service';
import { TypeOrmConfigService } from '@/storage/db/typeorm/config/typeorm-cls-plugin-config';

@Module({
  imports: [
    ConfigModule,
    ClsModule.forRoot({
      global: true,
      middleware: { mount: true },
      plugins: [TypeOrmClsPluginConfig],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
  ],
  providers: [TypeOrmConfigService],
  exports: [TypeOrmModule],
})
export class TypeOrmDatabaseModule {}