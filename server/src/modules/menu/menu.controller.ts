import { Controller, Get, Query } from '@nestjs/common';
import { MenuService } from './menu.service';

@Controller('api/menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  findAll(@Query('category') category?: string) {
    if (category && category !== 'Tất cả') {
      return this.menuService.findByCategory(category);
    }
    return this.menuService.findAll();
  }

  @Get('categories')
  getCategories() {
    return this.menuService.getCategories();
  }
}
