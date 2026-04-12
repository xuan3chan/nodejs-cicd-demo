import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MenuModule } from './modules/menu/menu.module';
import { ReservationModule } from './modules/reservation/reservation.module';
import { HealthModule } from './modules/health/health.module';

@Module({
  imports: [MenuModule, ReservationModule, HealthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
