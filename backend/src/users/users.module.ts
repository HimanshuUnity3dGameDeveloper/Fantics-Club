import { Module } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './users.model.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      },
    ]),
  ],
  providers: [UsersService],
  exports: [UsersService, MongooseModule],
})
export class UsersModule { }
