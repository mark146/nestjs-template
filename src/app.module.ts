import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { V1Module } from '@/application/app-api/v1/v1.module';

function createConfigModule() {
  return ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true,
  });
}

@Module({
  imports: [
    createConfigModule(),
    V1Module,
  ],
})
export class AppModule {}