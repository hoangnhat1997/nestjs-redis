import { Module } from '@nestjs/common';
import type { RedisClientOptions } from 'redis';

import {
  CacheModule,
  CacheInterceptor,
  CacheStoreFactory,
  CacheModuleOptions,
} from '@nestjs/cache-manager';

import { APP_INTERCEPTOR } from '@nestjs/core';
import * as redisStore from 'cache-manager-redis-store';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    CacheModule.register<RedisClientOptions>({
      store: redisStore as unknown as CacheStoreFactory,
      host: 'localhost',
      port: 6379,
    } as CacheModuleOptions<RedisClientOptions>),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
