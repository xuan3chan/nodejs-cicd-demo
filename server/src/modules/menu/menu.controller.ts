import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe, UseGuards, Inject, UseInterceptors } from '@nestjs/common';
import { CacheInterceptor, CacheKey, CacheTTL, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { MenuService } from './menu.service';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/menu')
export class MenuController {
  constructor(
    private readonly menuService: MenuService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheKey('menu_all')
  @CacheTTL(24 * 60 * 60 * 1000) // Cache 24 giờ
  findAll(@Query('category') category?: string) {
    if (category && category !== 'Tất cả') {
      return this.menuService.findByCategory(category);
    }
    return this.menuService.findAll();
  }

  @Get('categories')
  @UseInterceptors(CacheInterceptor)
  @CacheKey('menu_categories')
  @CacheTTL(24 * 60 * 60 * 1000) // Cache 24 giờ
  getCategories() {
    return this.menuService.getCategories();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.menuService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createDto: CreateMenuItemDto) {
    const result = await this.menuService.create(createDto);
    await this.invalidateMenuCache();
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateMenuItemDto,
  ) {
    const result = await this.menuService.update(id, updateDto);
    await this.invalidateMenuCache();
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.menuService.remove(id);
    await this.invalidateMenuCache();
    return { message: 'Deleted' };
  }

  private async invalidateMenuCache() {
    await this.cacheManager.del('menu_all');
    await this.cacheManager.del('menu_categories');
  }
}
