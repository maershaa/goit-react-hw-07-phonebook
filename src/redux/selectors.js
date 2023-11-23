export const getContacts = state => state.contacts;
export const getContactFavouriteStatus = (state, contactId) => {
  const contact = state.contactsStore.contacts.find(
    contact => contact.id === contactId
  );
  return contact ? contact.isFavourite : false;
};
