import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuItemEntity } from '../entities/menu-item.entity';
import { AdminEntity } from '../entities/admin.entity';
import { SiteConfigEntity } from '../entities/site-config.entity';
import { SeedService } from './seed.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([MenuItemEntity, AdminEntity, SiteConfigEntity]),
  ],
  providers: [SeedService],
})
export class DatabaseModule {}
