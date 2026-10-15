import { Injectable, ConflictException } from '@nestjs/common';
import { UsersService } from '../users/users.service.js';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

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
}
