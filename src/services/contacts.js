import contactCollection from '../db/models/Contacts.js';

export const getContacts = () => {
  return contactCollection.find();
};
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

  if (!rawResult) {
    return null;
  }

  return {
    data: rawResult.value,
    isNew: Boolean(rawResult.lastErrorObject.upserted),
  };
};

export const deleteContactById = (_id) =>
  contactCollection.findOneAndDelete({ _id });
