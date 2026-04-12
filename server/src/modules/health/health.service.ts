import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class HealthService {
  constructor(private readonly dataSource: DataSource) {}

  check() {
    let isDbConnected = false;
    try {
      isDbConnected = this.dataSource.isInitialized;
    } catch {
      isDbConnected = false;
    }

    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'Azure Kitchen API',
      version: '1.0.0',
      database: isDbConnected ? 'connected' : 'disconnected',
    };
  }
}
