import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';
import { existsSync } from 'fs';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * SPA Fallback — Serve React's index.html for all non-API routes.
   * In production, React build files are served from /public.
   * In development, Vite dev server handles the frontend.
   */
  @Get()
  root(@Res() res: Response) {
    return this.serveIndex(res);
  }

  /**
   * Catch-all: trả về index.html cho mọi route không khớp (React Router)
   * Route này được đặt cuối cùng, sau tất cả các API routes khác.
   */
  @Get('*')
  catchAll(@Res() res: Response) {
    return this.serveIndex(res);
  }

  private serveIndex(res: Response) {
    const indexPath = join(__dirname, '..', 'public', 'index.html');

    if (existsSync(indexPath)) {
      return res.sendFile(indexPath);
    }

    // Development: trả về API info
    return res.json({
      app: 'Bún Quậy 79 API',
      message: this.appService.getWelcomeMessage(),
      docs: {
        health: '/api/health',
        menu: '/api/menu',
        categories: '/api/menu/categories',
        reservation: 'POST /api/reservation',
      },
    });
  }
}

