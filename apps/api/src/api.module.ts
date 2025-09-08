import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'node:path';

import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { TypeOrmConfigService } from '../db';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.api.${process.env.NODE_ENV}`,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(TypeOrmConfigService()),
    TasksModule,
    ServeStaticModule.forRoot({
      // мы скопировали фронт в /app/static (см. Dockerfile)
      rootPath: join(process.cwd(), 'static/web/browser'),
      exclude: ['/api*'],
    }),
  ],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}
