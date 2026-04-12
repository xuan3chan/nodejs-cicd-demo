import { Repository } from 'typeorm';
import { ReservationEntity } from '../../entities/reservation.entity';
import { CreateReservationDto } from './dto/create-reservation.dto';
export declare class ReservationService {
    private readonly reservationRepo;
    private readonly logger;
    constructor(reservationRepo: Repository<ReservationEntity>);
    create(dto: CreateReservationDto): Promise<{
        message: string;
        reservation: ReservationEntity;
    }>;
    findAll(): Promise<ReservationEntity[]>;
    findOne(id: number): Promise<ReservationEntity>;
    updateStatus(id: number, status: string): Promise<ReservationEntity>;
    remove(id: number): Promise<void>;
}
