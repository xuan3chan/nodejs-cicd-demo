import { CreateReservationDto } from './dto/create-reservation.dto';
export interface Reservation extends CreateReservationDto {
    id: number;
    createdAt: string;
    status: string;
}
export declare class ReservationService {
    private readonly logger;
    private reservations;
    private nextId;
    create(dto: CreateReservationDto): {
        message: string;
        reservation: Reservation;
    };
    findAll(): Reservation[];
}
