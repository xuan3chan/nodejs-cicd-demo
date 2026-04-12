import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { MenuItemEntity } from '../../entities/menu-item.entity';
import { UploadModule } from '../upload/upload.module';

@Module({
  imports: [TypeOrmModule.forFeature([MenuItemEntity]), UploadModule],
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule {}
