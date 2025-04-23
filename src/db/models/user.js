import { model, Schema } from 'mongoose';

import { emailRegexp } from '../../constants/auth.js';
import { handleSaveError } from './hooks.js';

const usersSchema = new Schema(
  {
    name: { type: String, required: [true, 'Username nust be exist'] },

    email: { type: String, match: emailRegexp, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestramps: true, versionKey: false },
);

usersSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const UserCollection = model('users', usersSchema);

usersSchema.post('save', handleSaveError);

usersSchema.post('findOneAndUpdate', handleSaveError);
