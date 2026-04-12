import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getWelcomeMessage(): string {
    return 'Chào mừng đến với Bún Quậy 79!';
  }
}
