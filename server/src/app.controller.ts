import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  root() {
    return {
      app: 'Bun Quay 79 API',
      message: this.appService.getWelcomeMessage(),
      docs: {
        health: '/api/health',
        menu: '/api/menu',
        categories: '/api/menu/categories',
        reservation: 'POST /api/reservation',
      },
    };
  }
}
