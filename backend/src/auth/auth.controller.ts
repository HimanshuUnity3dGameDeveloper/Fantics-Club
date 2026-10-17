import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { LoginDto } from './dto/login.dto.js';



@Controller('auth')
export class AuthController {
  venuesService: any;
  constructor(private authService: AuthService) { }

  @Post('register')
  register(@Body() data: any) {
    return this.authService.register(data);
  }
  @Post('login')
  login(@Body() LoginDto: LoginDto) {
    return this.authService.login(LoginDto);
  }

}
