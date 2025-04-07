import { Router } from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getContactsController,
  getContactByIdController,
  addContactController,
  upsertContactController,
  patchContactControler,
  deleteContactControler,
} from '../controllers/contacts.js';

export const contactRouter = Router();

contactRouter.get('/', ctrlWrapper(getContactsController));

contactRouter.get('/:contactId', ctrlWrapper(getContactByIdController));

contactRouter.post('/', ctrlWrapper(addContactController));

contactRouter.put('/:contactId', ctrlWrapper(upsertContactController));

contactRouter.patch('/:contactId', ctrlWrapper(patchContactControler));

contactRouter.delete('/:contactId', ctrlWrapper(deleteContactControler));
