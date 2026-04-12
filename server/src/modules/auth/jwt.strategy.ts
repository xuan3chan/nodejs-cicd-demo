import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'azure-kitchen-secret-key-2024',
    });
  }

  async validate(payload: { sub: number; username: string; role: string }) {
    const admin = await this.authService.validateAdmin(payload.sub);
    if (!admin) {
      throw new UnauthorizedException();
    }
    return { id: payload.sub, username: payload.username, role: payload.role };
  }
}
