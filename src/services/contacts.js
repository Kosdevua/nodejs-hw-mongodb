import contactCollection from '../db/models/Contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export const getContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  userId,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;
  const contactsQuery = contactCollection.find({ userId });
  const contactsCount = await contactCollection
    .find({ userId })
    .merge(contactsQuery)
    .countDocuments();

  const contacts = await contactsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

//

export const getContactId = (id) => {
  return contactCollection.findOne({ _id: id, userId });
};

export const addContact = (payload) => contactCollection.create(payload);

export const updateContact = async (_id, payload, userId, option = {}) => {
  const { upsert = false } = option;

  const rawResult = await contactCollection.findOneAndUpdate(
    { _id, userId },
    payload,
    {
      new: true,
      upsert,
      includeResultMetadata: true,
    },
  );

  if (!rawResult.value) {
    return null;
  }

  return {
    data: rawResult.value,
    isNew: Boolean(rawResult.lastErrorObject.upserted),
  };
};

export const deleteContactById = (_id, userId) =>
  contactCollection.findOneAndDelete({ _id, userId });
