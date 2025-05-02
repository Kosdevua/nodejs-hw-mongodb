import createHttpError from 'http-errors';
import {
  getContactId,
  getContacts,
  addContact,
  updateContact,
  deleteContactById,
} from '../services/contacts.js';

import { parsePaginationParams } from '../utils/parsePaginationParams.js';

import { parseSortParams } from '../utils/parseSortParams.js';

export const getContactsController = async (req, res, next) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const { _id: userId } = req.user;

  const data = await getContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    userId,
  });

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data,
  });
};

export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;
  const data = await getContactId(contactId, userId);

  if (!data) {
    throw createHttpError(404, `Contact with id=${contactId} not found`);
  }
  res.json({
    status: 200,
    message: `Successfully found contact with id=${contactId} `,
    data,
  });
};

export const addContactController = async (req, res) => {
  const { _id: userId } = req.user;

  const data = await addContact({ ...req.body, userId });
  res.status(201).json({
    status: 201,
    message: 'Successfully add contact',
    data,
  });
};

export const patchContactController = async (req, res) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;
  const result = await updateContact(contactId, req.body, userId);
  if (!result) {
    throw createHttpError(404, `Contact with id=${contactId} not found`);
  }

  res.json({
    status: 200,
    message: 'Successfully update contact',
    data: result.data,
  });
};

export const deleteContactController = async (req, res) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;

  const data = await deleteContactById(contactId, userId);

  if (!data) {
    throw createHttpError(404, `Contact with id=${contactId} not found`);
  }

  res.status(204).send();
};
