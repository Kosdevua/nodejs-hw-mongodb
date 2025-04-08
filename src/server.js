import express from 'express';
import cors from 'cors';

import { getEnvVar } from './utils/getEnvVar.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { contactRouter } from './routers/contacts.js';

export const setupServer = () => {
  const app = express();

  app.use(cors());

  app.use(express.json());

  app.use('/contacts', contactRouter);

  app.use(notFoundHandler);

  app.use(errorHandler);

  const port = Number(getEnvVar('PORT', 3000));

  app.listen(port, () => {
    console.log(`server working in port ${port} port`);
  });
};
