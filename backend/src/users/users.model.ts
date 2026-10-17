
import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    firstName: {type: String,required: true,minlength: 2,trim: true},
    lastName: {type: String,required: true,minlength: 2,trim: true},
    userName: {type: String,required: true,minlength: 3,unique: true,trim: true},
    email: {type: String,required: true,unique: true,lowercase: true,trim: true},
    mobile: {type: String,required: true,match: /^\d{10}$/},
    passwordHash: {type: String,required: true,select: false},
    role: {type: String,required: true,
    enum: ['admin', 'user'],
      default: 'user',
    },
    avatar: {type: String,default: ''},

    bio: {
      type: String,
      default: '',
    },

    website: {
      type: String,
      default: '',
    },

    isProfileComplete: {
      type: Boolean,
      required: true,
      default: false,
    },

    active: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export interface UserModel extends mongoose.Document {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  mobile: string;
  passwordHash: string;
  role: 'admin' | 'user';
  avatar?: string;
  bio?: string;
  website?: string;
  isProfileComplete: boolean;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}