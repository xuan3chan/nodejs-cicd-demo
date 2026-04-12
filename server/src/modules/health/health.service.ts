import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  check() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'Azure Kitchen API',
      version: '1.0.0',
    };
  }
}
