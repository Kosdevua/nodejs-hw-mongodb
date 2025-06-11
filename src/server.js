import express from 'express';
import cors from 'cors';

import { getEnvVar } from './utils/getEnvVar.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import cookieParser from 'cookie-parser';

import router from './routers/index.js';

import { UPLOAD_DIR } from './constants/index.js';

export const setupServer = () => {
  const app = express();

  app.use(cors());

  app.use(express.json());

  app.use(cookieParser());

  app.use(router);

  app.use(notFoundHandler);

  app.use(errorHandler);

  app.use('/uploads', express.static(UPLOAD_DIR));

  const port = Number(getEnvVar('PORT', 3000));

  app.listen(port, () => {
    console.log(`server working in port ${port} port`);
  });
};
