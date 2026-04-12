import { Cache } from 'cache-manager';
import { SiteConfigService } from './site-config.service';
export declare class SiteConfigController {
    private readonly siteConfigService;
    private cacheManager;
    constructor(siteConfigService: SiteConfigService, cacheManager: Cache);
    getAll(): Promise<Record<string, any>>;
    get(key: string): Promise<any>;
    upsert(key: string, value: any): Promise<import("../../entities/site-config.entity").SiteConfigEntity>;
}
