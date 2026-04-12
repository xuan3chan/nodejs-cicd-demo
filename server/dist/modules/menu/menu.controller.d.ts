import { Cache } from 'cache-manager';
import { MenuService } from './menu.service';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';
export declare class MenuController {
    private readonly menuService;
    private cacheManager;
    constructor(menuService: MenuService, cacheManager: Cache);
    findAll(category?: string): Promise<import("../../entities/menu-item.entity").MenuItemEntity[]>;
    getCategories(): Promise<string[]>;
    findOne(id: number): Promise<import("../../entities/menu-item.entity").MenuItemEntity>;
    create(createDto: CreateMenuItemDto): Promise<import("../../entities/menu-item.entity").MenuItemEntity>;
    update(id: number, updateDto: UpdateMenuItemDto): Promise<import("../../entities/menu-item.entity").MenuItemEntity>;
    remove(id: number): Promise<{
        message: string;
    }>;
    private invalidateMenuCache;
}
