import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClsModule } from 'nestjs-cls';
import { TypeOrmClsPluginConfig } from './config/typeorm-cls-plugin-config';
import { TypeOrmConfigService } from './config/typeorm-config.service';
import { UserEntity } from './mariadb/v1/user/user.entity';

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
    TypeOrmModule.forFeature([
      UserEntity,
    ]),
  ],
  providers: [TypeOrmConfigService],
  exports: [TypeOrmModule],
})
export class TypeOrmDatabaseModule {}