import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import { randomBytes } from 'node:crypto';

import UserCollection from '../db/models/User.js';

import SessionCollection from '../db/models/Session.js';

import {
  refreshTokenLifeTime,
  accessTokenLifeTime,
} from '../constants/auth.js';

console.log(randomBytes(30).toString('base64'));

export const registerUser = async (payload) => {
  const user = await UserCollection.findOne({ email: payload.email });
  if (user) throw createHttpError(409, 'Email is use');

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
  const isEqual = await bcrypt.compare(payload.password, user.password);

  if (!isEqual) {
    throw createHttpError(401, 'Email or password invalid');
  }

  await SessionCollection.findOneAndDelete({ userId: user._id });

  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return SessionCollection.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: Date.now() + accessTokenLifeTime,
    refreshTokenValidUntil: Date.now() + refreshTokenLifeTime,
  });
};
