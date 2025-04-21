import { model, Schema } from 'mongoose';

const userShema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestramps: true, versionKey: false },
);

export const UserCollection = model('users', userShema);
