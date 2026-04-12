import { Test } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  beforeEach(async () => {
    await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();
  });

  describe('AppService', () => {
    it('should return welcome message', () => {
      const appService = new AppService();
      expect(appService.getWelcomeMessage()).toBe(
        'Chào mừng đến với Bún Quậy 79!',
      );
    });
  });
});
