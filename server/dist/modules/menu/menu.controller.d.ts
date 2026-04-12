import { MenuService } from './menu.service';
export declare class MenuController {
    private readonly menuService;
    constructor(menuService: MenuService);
    findAll(category?: string): import("./menu.service").MenuItem[];
    getCategories(): string[];
}
