import { Controller, Post, Body, Get } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Controller('api/reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  create(@Body() createReservationDto: CreateReservationDto) {
    return this.reservationService.create(createReservationDto);
  }

  @Get()
  findAll() {
    return this.reservationService.findAll();
  }
}
