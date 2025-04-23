import { model, Schema } from 'mongoose';

import { emailRegexp } from '../../constants/auth.js';

const userShema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, match: emailRegexp, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestramps: true, versionKey: false },
);

export const UserCollection = model('users', userShema);
