import { Controller, Get, Put, Param, Body, UseGuards, Inject, UseInterceptors } from '@nestjs/common';
import { CacheInterceptor, CacheKey, CacheTTL, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { SiteConfigService } from './site-config.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/site-config')
export class SiteConfigController {
  constructor(
    private readonly siteConfigService: SiteConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheKey('site_config_all')
  @CacheTTL(24 * 60 * 60 * 1000) // Cache 24 giờ
  getAll() {
    return this.siteConfigService.getAll();
  }

  @Get(':key')
  get(@Param('key') key: string) {
    return this.siteConfigService.get(key);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':key')
  async upsert(@Param('key') key: string, @Body('value') value: any) {
    const result = await this.siteConfigService.upsert(key, value);
    // Xóa cache cấu hình khi admin cập nhật
    await this.cacheManager.del('site_config_all');
    return result;
  }
}
