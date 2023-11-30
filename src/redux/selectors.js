import { createSelector } from '@reduxjs/toolkit';

export const selectContacts = state => state.contactsStore.contacts.items;
export const selectContactsIsLoading = state =>
  state.contactsStore.contacts.isLoading;
export const selectContactsError = state => state.contactsStore.contacts.error;
export const selectContactsIsFavourite = state =>
  state.contactsStore.contacts.isFavourite;
export const selectContactsFavouriteContacts = state =>
  state.contactsStore.contacts.favouriteContacts;

export const selectFilter = state => state.contactsStore.filterWord;

// Создание селектора для фильтрации контактов
export const selectFilteredContacts = createSelector(
  // Зависимости для селектора
  [selectContacts, selectFilter],
  (contacts, filterWord) => {
    console.log('Input contacts:', contacts);
    console.log('Input filterWord:', filterWord);

    const formattedFilterWord = filterWord.toLowerCase().trim();

    // Фильтрация контактов по имени или номеру телефона на основе filterWord

    return contacts.filter(
      contact =>
        contact.name.toLowerCase().includes(formattedFilterWord) ||
        contact.phone.toString().includes(formattedFilterWord)
    );
  }
);
