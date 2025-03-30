import contactCollection from '../db/models/Contacts.js';

export const getContacts = () => contactCollection.find();
export const getContactId = (id) => contactCollection.findOne({ _id: id });
