import contactCollection from '../db/models/Contacts.js';

export const getContacts = () => {
  return contactCollection.find();
};
export const getContactId = (id) => {
  //   throw new Error('Database crashed');
  return contactCollection.findOne({ _id: id });
};
