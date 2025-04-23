import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';

import { UserCollection } from '../db/models/User.js';

export const registerUser = async (payload) => {
  const user = await UserCollection.findOne({ email: payload.email });
  if (user) throw createHttpError(409, 'Email already is use');

  const hashPassword = await bcrypt.hash(payload.password, 10);

  console.log('encryptedPassword:', hashPassword);

  return await UserCollection.create({
    ...payload,
    password: hashPassword,
  });
};

export const loginUser = async (payload) => {
  const user = await UserCollection.findOne({ email: payload.email });
  if (!user) {
    throw createHttpError(401, 'User not found');
  }
  const isEqual = await bcrypt.compare(payload.password, user.password); // Порівнюємо хеші паролів

  if (!isEqual) {
    throw createHttpError(401, 'Unauthorized');
  }
};
