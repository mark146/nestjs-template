import { DataSource, EntityTarget, Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '@/storage/db/typeorm/mariadb/v1/user/user.entity';

@Injectable()
export class MariadbDataSource {
  private readonly dataSource: DataSource;

  constructor(
    private readonly configService: ConfigService,
  ) {
    this.dataSource = new DataSource({
      type: 'mysql',
      host: this.configService.get('DB_HOST'),
      port: this.configService.get('DB_PORT'),
      username: this.configService.get('DB_USERNAME'),
      password: this.configService.get('DB_PASSWORD'),
      database: this.configService.get('DB_NAME'),
      entities: [
        UserEntity
      ],
      logging: true,
      synchronize: false,
    });

    this.dataSource.initialize()
  }

  getRepository<T>(entity: EntityTarget<T>): Repository<T> {
    return this.dataSource.getRepository(entity);
  }
}