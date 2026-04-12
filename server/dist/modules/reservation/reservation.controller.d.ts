import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
export declare class ReservationController {
    private readonly reservationService;
    constructor(reservationService: ReservationService);
    create(createReservationDto: CreateReservationDto): {
        message: string;
        reservation: import("./reservation.service").Reservation;
    };
    findAll(): import("./reservation.service").Reservation[];
}
