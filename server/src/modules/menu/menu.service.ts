import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuItemEntity } from '../../entities/menu-item.entity';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';
import { UploadService } from '../upload/upload.service';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(MenuItemEntity)
    private readonly menuRepository: Repository<MenuItemEntity>,
    private readonly uploadService: UploadService,
  ) {}

  async findAll(): Promise<MenuItemEntity[]> {
    return this.menuRepository.find();
  }

  async findByCategory(category: string): Promise<MenuItemEntity[]> {
    return this.menuRepository.find({ where: { category } });
  }

  async findOne(id: number): Promise<MenuItemEntity> {
    const item = await this.menuRepository.findOne({ where: { id } });
    if (!item) {
      throw new NotFoundException(`Menu item with ID ${id} not found`);
    }
    return item;
  }

  async getCategories(): Promise<string[]> {
    const items = await this.menuRepository.find({ select: ['category'] });
    const categories = [...new Set(items.map((item) => item.category))];
    return ['Tất cả', ...categories];
  }

  async create(createDto: CreateMenuItemDto): Promise<MenuItemEntity> {
    const newItem = this.menuRepository.create(createDto);
    return this.menuRepository.save(newItem);
  }

  async update(id: number, updateDto: UpdateMenuItemDto): Promise<MenuItemEntity> {
    const item = await this.findOne(id);
    Object.assign(item, updateDto);
    return this.menuRepository.save(item);
  }

  async remove(id: number): Promise<void> {
    const item = await this.findOne(id);
    // Xóa ảnh trên Cloudinary nếu có
    if (item.image) {
      await this.uploadService.deleteImageByUrl(item.image);
    }
    await this.menuRepository.remove(item);
  }
}
