import { createSelector } from '@reduxjs/toolkit';

export const getContactFavouriteStatus = (state, contactId) => {
  const contact = state.contactsStore.contacts.items.find(
    contact => contact.id === contactId
  );
  return contact ? contact.isFavourite : false;
};

export const selectContacts = state => state.contactsStore.contacts.items;
export const selectContactsIsLoading = state =>
  state.contactsStore.contacts.isLoading;
export const selectContactsError = state => state.contactsStore.contacts.error;
export const selectContactsIsFavourite = state =>
  state.contactsStore.contacts.isFavourite;
export const selectContactsFavouriteContacts = state =>
  state.contactsStore.contacts.favouriteContacts;
export const selectFilter = state => state.contactsStore.filterWord;
export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filterWord) => {
    if (!Array.isArray(contacts) || contacts.length === 0) {
      return [];
    }

    return contacts.filter(
      ({ name, number }) =>
        name.toLowerCase().includes(filterWord.toLowerCase().trim()) ||
        number.toString().includes(filterWord.toLowerCase().trim())
    );
  }
);
