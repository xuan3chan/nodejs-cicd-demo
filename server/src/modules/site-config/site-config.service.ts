/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SiteConfigEntity } from '../../entities/site-config.entity';

@Injectable()
export class SiteConfigService {
  constructor(
    @InjectRepository(SiteConfigEntity)
    private readonly configRepo: Repository<SiteConfigEntity>,
  ) {}

  async getAll(): Promise<Record<string, any>> {
    const configs = await this.configRepo.find();
    const result: Record<string, any> = {};
    for (const c of configs) {
      result[c.key] = c.value;
    }
    return result;
  }

  async get(key: string): Promise<any> {
    const config = await this.configRepo.findOne({ where: { key } });
    return config?.value ?? null;
  }

  async upsert(key: string, value: any): Promise<SiteConfigEntity> {
    let config = await this.configRepo.findOne({ where: { key } });
    if (config) {
      config.value = value;
    } else {
      config = this.configRepo.create({ key, value });
    }
    return this.configRepo.save(config);
  }
}
