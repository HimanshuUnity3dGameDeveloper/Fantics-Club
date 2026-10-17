import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { UsersModule } from '../users/users.module.js';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from './auth.guard.js';
import { AdminGuard } from './admin.guard.js';

@Module({
  imports: [UsersModule,
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get('JWT_SECRET'),
          signOptions: {
            expiresIn: '1d'
          },
        };
      },
    }),
  ],
  exports: [JwtAuthGuard, AdminGuard, JwtModule],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthGuard, AdminGuard],
})
export class AuthModule { }
