import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';
import { getContactId, getContacts } from '../services/contacts.js';

export const getContactsController = async (req, res, next) => {
  const data = await getContacts();
  res.json({
    status: 200, // для краси
    message: 'Successfully found contacts!', // для краси
    data, // важлива інформація
  });
};

export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;

  if (!isValidObjectId(contactId)) {
    return res.status(400).json({
      status: 400,
      message: `Invalid contact id format: ${contactId}`,
    });
  }

  const data = await getContactId(contactId);

  if (!data) {
    throw createHttpError(404, `Contact with id=${contactId} not found`);

    // const error = new Error(`Contact with id=${contactId} not found`);
    // error.status = 404;
    // throw error;

    // return res.status(404).json({
    //   status: 404,
    //   message: `Contact with ${contactId} not found`,
    // });
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id=${contactId} `,
    data,
  });
};
