import express from 'express';
import cors from 'cors';
import PinoHttp from 'pino-http';

const PORT = 3000;

const setupServer = express();

setupServer.use(cors());

const logger = PinoHttp({
  transport: {
    target: 'pino-pretty',
  },
});

setupServer.use(logger);

setupServer.listen(PORT, () => {
  console.log(`server working in port ${PORT}`);
});
