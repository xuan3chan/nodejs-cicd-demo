import { Controller, Get, Res, Req } from '@nestjs/common';
import { Response, Request } from 'express';
import { join } from 'path';
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
  root(@Req() req: Request, @Res() res: Response) {
    const indexPath = join(__dirname, '..', 'public', 'index.html');

    // Nếu file index.html tồn tại (production), serve nó
    try {
      return res.sendFile(indexPath);
    } catch {
      // Development: trả về API info
      return res.json({
        app: 'Azure Kitchen API',
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
}
