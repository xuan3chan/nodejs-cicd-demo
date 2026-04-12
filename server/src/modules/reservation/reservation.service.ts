import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReservationEntity } from '../../entities/reservation.entity';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Injectable()
export class ReservationService {
  private readonly logger = new Logger(ReservationService.name);

  constructor(
    @InjectRepository(ReservationEntity)
    private readonly reservationRepo: Repository<ReservationEntity>,
  ) {}

  async create(dto: CreateReservationDto): Promise<{
    message: string;
    reservation: ReservationEntity;
  }> {
    const reservation = this.reservationRepo.create(dto);
    const savedReservation = await this.reservationRepo.save(reservation);

    this.logger.log(
      `📋 New reservation from ${dto.name} - ${dto.phone} for ${dto.date} at ${dto.time} (${dto.guests} guests)`,
    );

    return {
      message: 'Đặt bàn thành công! Chúng tôi sẽ liên hệ xác nhận.',
      reservation: savedReservation,
    };
  }

  async findAll(): Promise<ReservationEntity[]> {
    return this.reservationRepo.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: number): Promise<ReservationEntity> {
    const reservation = await this.reservationRepo.findOne({ where: { id } });
    if (!reservation) {
      throw new NotFoundException(`Reservation with ID ${id} not found`);
    }
    return reservation;
  }

  async updateStatus(id: number, status: string): Promise<ReservationEntity> {
    const reservation = await this.findOne(id);
    reservation.status = status;
    return this.reservationRepo.save(reservation);
  }

  async remove(id: number): Promise<void> {
    const reservation = await this.findOne(id);
    await this.reservationRepo.remove(reservation);
  }
}
