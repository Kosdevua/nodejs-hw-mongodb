import contactCollection from '../db/models/Contacts.js';

import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getContacts = async ({ page, perPage }) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = contactCollection.find();
  const contactsCount = await contactCollection
    .find()
    .merge(contactsQuery)
    .countDocuments();

  const contacts = await contactsQuery.skip(skip).limit(limit).exec();

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

//

export const getContactId = (id) => {
  return contactCollection.findOne({ _id: id });
};

export const addContact = (payload) => contactCollection.create(payload);

export const updateContact = async (_id, payload, option = {}) => {
  const { upsert = false } = option;

  const rawResult = await contactCollection.findOneAndUpdate({ _id }, payload, {
    new: true,
    upsert,
    includeResultMetadata: true,
  });

  if (!rawResult.value) {
    return null;
  }

  return {
    data: rawResult.value,
    isNew: Boolean(rawResult.lastErrorObject.upserted),
  };
};

export const deleteContactById = (_id) =>
  contactCollection.findOneAndDelete({ _id });
