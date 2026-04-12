import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { AdminEntity } from '../../entities/admin.entity';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private readonly adminRepo;
    private readonly jwtService;
    constructor(adminRepo: Repository<AdminEntity>, jwtService: JwtService);
    login(dto: LoginDto): Promise<{
        access_token: string;
        admin: {
            id: number;
            username: string;
            role: string;
        };
    }>;
    validateAdmin(id: number): Promise<AdminEntity | null>;
    getProfile(id: number): Promise<{
        id: number;
        username: string;
        role: string;
    }>;
}
