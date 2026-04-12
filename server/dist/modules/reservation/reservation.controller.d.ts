import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
export declare class ReservationController {
    private readonly reservationService;
    constructor(reservationService: ReservationService);
    create(createReservationDto: CreateReservationDto): Promise<{
        message: string;
        reservation: import("../../entities/reservation.entity").ReservationEntity;
    }>;
    findAll(): Promise<import("../../entities/reservation.entity").ReservationEntity[]>;
    findOne(id: number): Promise<import("../../entities/reservation.entity").ReservationEntity>;
    updateStatus(id: number, status: string): Promise<import("../../entities/reservation.entity").ReservationEntity>;
    remove(id: number): Promise<void>;
}
