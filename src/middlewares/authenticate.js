import createHttpError from 'http-errors';

import { findSession, findUser } from '../services/auth.js';

export const authenticate = async (req, res, next) => {
  //   const { authorization   } = req.header;
  const authorization = req.get('Authorization');

  if (!authorization) {
    return next(createHttpError(401, 'Authorization header missing'));
  }

  const [bearer, accessToken] = authorization.split(' ');

  if (bearer !== 'Bearer') {
    console.log(`bearer: ${bearer}`, `accessToken ${accessToken}`);

    return next(createHttpError(401, 'Header must have type Bearer'));
  }

  const session = await findSession({ accessToken });
  console.log(session);
  if (!session) {
    return next(createHttpError(401, 'Session not found'));
  }
  if (session.accessTokenValidUntil < Date.now()) {
    return next(createHttpError(401, 'Access token expired'));
  }

  const user = await findUser({ _id: session.userId });
  if (!user) {
    return next(createHttpError(401, 'User not found'));
  }
  next();
};
