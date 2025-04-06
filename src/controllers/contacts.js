import { isValidObjectId } from 'mongoose';
import { getContactId, getContacts } from '../services/contacts.js';

export const getContactsController = async (req, res) => {
  try {
    const data = await getContacts();
    res.json({
      status: 200, // для краси
      message: 'Successfully found contacts!', // для краси
      data, // важлива інформація
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'message',
      error: error.message,
    });
  }
};

export const getContactByIdController = async (req, res) => {
  try {
    const { contactId } = req.params;

    if (!isValidObjectId(contactId)) {
      return res.status(400).json({
        status: 400,
        message: `Invalid contact id format: ${contactId}`,
      });
    }

    const data = await getContactId(contactId);

    if (!data) {
      return res.status(404).json({
        status: 404,
        message: `Contact with ${contactId} not found`,
      });
    }

    res.json({
      status: 200,
      message: `Successfully found contact with ${contactId} id`,
      data,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Internal server error',
      error: error.message,
    });
  }
};
