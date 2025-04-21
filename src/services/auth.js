import { UserCollection } from '../db/models/user.js';

export const regesterUser = async (payload) => {
  return await UserCollection.create(payload);
};
