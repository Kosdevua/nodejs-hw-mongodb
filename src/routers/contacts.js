import { Router } from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getContactsController,
  getContactByIdController,
  addContactController,
  patchContactController,
  deleteContactController,
} from '../controllers/contacts.js';

import { validateBody } from '../middlewares/validateBody.js';

import {
  contactAddSchema,
  contactUpdateSchema,
} from '../validation/contacts.js';

import { isValidId } from '../middlewares/isValidId.js';

import { authenticate } from '../middlewares/authenticate.js';

import { upload } from '../middlewares/multer.js';

const contactRouter = Router();

contactRouter.use(authenticate);

contactRouter.get('/', ctrlWrapper(getContactsController));

contactRouter.get(
  '/:contactId',
  isValidId,
  ctrlWrapper(getContactByIdController),
);

contactRouter.post(
  '/',
  validateBody(contactAddSchema),
  ctrlWrapper(addContactController),
);

contactRouter.patch(
  '/:contactId',
  isValidId,
  validateBody(contactUpdateSchema),
  ctrlWrapper(patchContactController),
);

contactRouter.delete(
  '/:contactId',
  isValidId,
  ctrlWrapper(deleteContactController),
);

export default contactRouter;
