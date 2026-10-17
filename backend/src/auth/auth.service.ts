import { Injectable, ConflictException, UnauthorizedException, } from '@nestjs/common';
import { UsersService } from '../users/users.service.js';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto.js';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  async register(data: any) {
    const { email, password } = data;

    if (await this.usersService.findByEmail(email)) {
      throw new ConflictException('Email already exists');
    }

    const passwordHash = await bcrypt.hash(password, 10);

    return this.usersService.createUser({
      ...data,
      email: email.trim().toLowerCase(),
      passwordHash,
    });
  }
  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmailForLogin(
      loginDto.email,
    );
    if (!user || !user.passwordHash) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.passwordHash,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = {
      sub: user._id.toString(),
      email: user.email,
      role: user.role,
    };
    const accessToken = await this.jwtService.signAsync(payload);
    return {
      access_token: accessToken,
      user: {
        id: user._id.toString(),
        email: user.email,
        userName: user.userName,
        role: user.role,
      },
    };
  }

}

