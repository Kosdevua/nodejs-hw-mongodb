import { Router } from 'express';

import {
  getContactByIdController,
  getContactsController,
} from '../controllers/contacts.js';

export const contactRouter = Router();

contactRouter.get('/', getContactsController);

contactRouter.get('/:contactId', getContactByIdController);
