import { Injectable, Logger } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';

export interface Reservation extends CreateReservationDto {
  id: number;
  createdAt: string;
  status: string;
}

@Injectable()
export class ReservationService {
  private readonly logger = new Logger(ReservationService.name);
  private reservations: Reservation[] = [];
  private nextId = 1;

  create(dto: CreateReservationDto): {
    message: string;
    reservation: Reservation;
  } {
    const reservation: Reservation = {
      ...dto,
      id: this.nextId++,
      createdAt: new Date().toISOString(),
      status: 'pending',
    };

    this.reservations.push(reservation);
    this.logger.log(
      `📋 New reservation from ${dto.name} - ${dto.phone} for ${dto.date} at ${dto.time} (${dto.guests} guests)`,
    );

    return {
      message: 'Đặt bàn thành công! Chúng tôi sẽ liên hệ xác nhận.',
      reservation,
    };
  }

  findAll(): Reservation[] {
    return this.reservations;
  }
}
