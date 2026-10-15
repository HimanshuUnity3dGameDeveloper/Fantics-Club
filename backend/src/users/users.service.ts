import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserModel } from './users.model.js';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<UserModel>) {}

  findByEmail(email: string) {
    return this.userModel.findOne({ email: email.toLowerCase().trim() });
  }

  findByUserName(userName: string) {
    return this.userModel.findOne({ userName: userName.trim() });
  }

  findByMobile(mobile: string) {
    return this.userModel.findOne({ mobile });
  }

  createUser(userData: Partial<UserModel>) {
    return this.userModel.create(userData);
  }
}
