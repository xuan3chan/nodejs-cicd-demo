"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ReservationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationService = void 0;
const common_1 = require("@nestjs/common");
let ReservationService = ReservationService_1 = class ReservationService {
    logger = new common_1.Logger(ReservationService_1.name);
    reservations = [];
    nextId = 1;
    create(dto) {
        const reservation = {
            ...dto,
            id: this.nextId++,
            createdAt: new Date().toISOString(),
            status: 'pending',
        };
        this.reservations.push(reservation);
        this.logger.log(`📋 New reservation from ${dto.name} - ${dto.phone} for ${dto.date} at ${dto.time} (${dto.guests} guests)`);
        return {
            message: 'Đặt bàn thành công! Chúng tôi sẽ liên hệ xác nhận.',
            reservation,
        };
    }
    findAll() {
        return this.reservations;
    }
};
exports.ReservationService = ReservationService;
exports.ReservationService = ReservationService = ReservationService_1 = __decorate([
    (0, common_1.Injectable)()
], ReservationService);
//# sourceMappingURL=reservation.service.js.map