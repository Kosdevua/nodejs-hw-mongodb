import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { getEnvVar } from './utils/getEnvVar.js';
import { getContacts, getContactId } from './services/contacts.js';

export const setupServer = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );
  app.get('/contacts', async (req, res) => {
    const data = await getContacts();
    res.json({
      status: 200, // для краси
      message: 'Successfully found contacts!', // для краси
      data, // важлива інформація
    });
  });

  app.get('/contacts/:contactId', async (req, res) => {
    const { contactId } = req.params;
    const data = await getContactId(contactId);

    if (!data) {
      return res.status().json({
        status: 404,
        message: `Successfully found contact with id ${contactId}!
        Contact with ${contactId} not found`,
      });
    }

    res.json({
      status: 200,
      message: 'Successfully found contact with id',
      data,
    });
  });

  app.use((req, res) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.use((error, req, res, next) => {
    res.status(500).json({
      message: error.message,
    });
  });

  const port = Number(getEnvVar('PORT', 3000));

  app.listen(port, () => {
    console.log(`server working in port ${port} port`);
  });
};
