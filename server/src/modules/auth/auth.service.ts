import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AdminEntity } from '../../entities/admin.entity';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AdminEntity)
    private readonly adminRepo: Repository<AdminEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginDto): Promise<{
    access_token: string;
    admin: { id: number; username: string; role: string };
  }> {
    const admin = await this.adminRepo.findOne({
      where: { username: dto.username },
    });
    if (!admin) {
      throw new UnauthorizedException('Tên đăng nhập hoặc mật khẩu không đúng');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, admin.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Tên đăng nhập hoặc mật khẩu không đúng');
    }

    const payload = {
      sub: admin.id,
      username: admin.username,
      role: admin.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
      admin: {
        id: admin.id,
        username: admin.username,
        role: admin.role,
      },
    };
  }

  async validateAdmin(id: number): Promise<AdminEntity | null> {
    return this.adminRepo.findOne({ where: { id } });
  }

  async getProfile(id: number) {
    const admin = await this.adminRepo.findOne({ where: { id } });
    if (!admin) {
      throw new UnauthorizedException('Admin not found');
    }
    return {
      id: admin.id,
      username: admin.username,
      role: admin.role,
    };
  }
}
