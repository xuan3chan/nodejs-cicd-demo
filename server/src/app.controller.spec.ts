import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('AppService', () => {
    it('should return welcome message', () => {
      const appService = new AppService();
      expect(appService.getWelcomeMessage()).toBe('Chào mừng đến với Azure Kitchen!');
    });
  });
});
