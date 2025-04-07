import contactCollection from '../db/models/Contacts.js';

export const getContacts = () => {
  return contactCollection.find();
};
export const getContactId = (id) => {
  //   throw new Error('Database crashed');
  return contactCollection.findOne({ _id: id });
};

export const addContact = (payload) => contactCollection.create(payload);

export const updateContact = async (_id, payload, option = {}) => {
  const { upsert = false } = option; // передаємо третім аргументом

  const rawResult = await contactCollection.findOneAndUpdate({ _id }, payload, {
    new: true, //щоб додавав оновлений обект
    upsert, // щоб він додавав або оновлював та додавав
    includeResultMetadata: true, //повертається повний результат відповіді
  });

  if (!rawResult || rawResult.value) return null;
  return {
    data: rawResult.value,
    isNew: Boolean(rawResult.lastErrorObject.upserted), //true -   якщо ми додали, false - якщо ми оновили
  };
};

export const deleteContactById = (_id) =>
  contactCollection.findOneAndDelete({ _id });
