import { Repository } from 'typeorm';
import { MenuItemEntity } from '../../entities/menu-item.entity';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';
import { UploadService } from '../upload/upload.service';
export declare class MenuService {
    private readonly menuRepository;
    private readonly uploadService;
    constructor(menuRepository: Repository<MenuItemEntity>, uploadService: UploadService);
    findAll(): Promise<MenuItemEntity[]>;
    findByCategory(category: string): Promise<MenuItemEntity[]>;
    findOne(id: number): Promise<MenuItemEntity>;
    getCategories(): Promise<string[]>;
    create(createDto: CreateMenuItemDto): Promise<MenuItemEntity>;
    update(id: number, updateDto: UpdateMenuItemDto): Promise<MenuItemEntity>;
    remove(id: number): Promise<void>;
}
