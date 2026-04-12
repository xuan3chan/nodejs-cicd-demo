import { OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { MenuItemEntity } from '../entities/menu-item.entity';
import { AdminEntity } from '../entities/admin.entity';
import { SiteConfigEntity } from '../entities/site-config.entity';
export declare class SeedService implements OnModuleInit {
    private readonly menuRepository;
    private readonly adminRepository;
    private readonly configRepository;
    private readonly logger;
    constructor(menuRepository: Repository<MenuItemEntity>, adminRepository: Repository<AdminEntity>, configRepository: Repository<SiteConfigEntity>);
    onModuleInit(): Promise<void>;
    private seedAdmin;
    private seedMenu;
    private seedSiteConfig;
}
