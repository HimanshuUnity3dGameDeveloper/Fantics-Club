import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserModel } from './users.model.js';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User')
    private userModel: Model<UserModel>,
  ) { }

  // Find a user by email for normal lookups
  findByEmail(email: string) {
    return this.userModel
      .findOne({ email: email.toLowerCase().trim() })
      .exec();
  }

  // Find an active user for login verification
  findByEmailForLogin(email: string) {
    return this.userModel
      .findOne({
        email: email.toLowerCase().trim(),
        active: true,
      })
      .select('+passwordHash')
      .exec();
  }

  findByUserName(userName: string) {
    return this.userModel
      .findOne({ userName: userName.trim() })
      .exec();
  }

  findByMobile(mobile: string) {
    return this.userModel.findOne({ mobile }).exec();
  }

  createUser(userData: Partial<UserModel>) {
    return this.userModel.create(userData);
  }
}