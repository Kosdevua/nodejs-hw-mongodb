import { Router } from 'express';

import {
  addContactController,
  getContactByIdController,
  getContactsController,
  upsertContactController,
} from '../controllers/contacts.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

export const contactRouter = Router();

contactRouter.get('/', ctrlWrapper(getContactsController));

contactRouter.get('/:contactId', ctrlWrapper(getContactByIdController));

contactRouter.post('/', ctrlWrapper(addContactController));

contactRouter.put('/:contactId', ctrlWrapper(upsertContactController));
