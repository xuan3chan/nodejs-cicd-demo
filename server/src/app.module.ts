import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { redisStore } from 'cache-manager-redis-yet';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MenuModule } from './modules/menu/menu.module';
import { ReservationModule } from './modules/reservation/reservation.module';
import { HealthModule } from './modules/health/health.module';
import { AuthModule } from './modules/auth/auth.module';
import { SiteConfigModule } from './modules/site-config/site-config.module';
import { DatabaseModule } from './database/database.module';
import { UploadModule } from './modules/upload/upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_DATABASE || 'azure_kitchen',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Only for dev! Use migrations for prod
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => ({
        store: await redisStore({
          socket: {
            host: process.env.REDIS_HOST || 'localhost',
            port: parseInt(process.env.REDIS_PORT || '6379'),
          },
        }),
        ttl: 24 * 60 * 60 * 1000, // 24 giờ mặc định
      }),
    }),
    // Rate Limiting: 60 requests / 60 giây / mỗi IP
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 60,
    }]),
    DatabaseModule,
    AuthModule,
    MenuModule,
    ReservationModule,
    SiteConfigModule,
    HealthModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // Áp dụng rate limit toàn cục
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
