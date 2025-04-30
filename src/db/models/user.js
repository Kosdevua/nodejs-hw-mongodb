import { model, Schema } from 'mongoose';

import { emailRegexp } from '../../constants/auth.js';
import { handleSaveError } from './hooks.js';

const usersSchema = new Schema(
  {
    name: { type: String, required: [true, 'Username must be exist'] },

    email: { type: String, match: emailRegexp, unique: true, required: true },
    password: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

usersSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

usersSchema.post('save', handleSaveError);

usersSchema.post('findOneAndUpdate', handleSaveError);

export const UserCollection = model('users', usersSchema);
