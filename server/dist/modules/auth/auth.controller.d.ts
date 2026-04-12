import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        admin: {
            id: number;
            username: string;
            role: string;
        };
    }>;
    getProfile(req: {
        user: {
            id: number;
        };
    }): Promise<{
        id: number;
        username: string;
        role: string;
    }>;
}
