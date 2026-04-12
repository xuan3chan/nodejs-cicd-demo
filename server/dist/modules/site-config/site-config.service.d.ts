import { Repository } from 'typeorm';
import { SiteConfigEntity } from '../../entities/site-config.entity';
export declare class SiteConfigService {
    private readonly configRepo;
    constructor(configRepo: Repository<SiteConfigEntity>);
    getAll(): Promise<Record<string, any>>;
    get(key: string): Promise<any>;
    upsert(key: string, value: any): Promise<SiteConfigEntity>;
}
