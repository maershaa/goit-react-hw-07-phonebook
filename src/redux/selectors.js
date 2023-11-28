import { createSelector } from '@reduxjs/toolkit';

// export const getContactFavouriteStatus = (state, contactId) => {
//   const contact = state.contactsStore.contacts.items.find(
//     contact => contact.id === contactId
//   );
//   return contact ? contact.isFavourite : false;
// };

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
  // Функция, которая выполняет фильтрацию контактов на основе filterWord
  (contacts, filterWord) => {
    console.log(contacts);
    console.log(filterWord);

    // Фильтрация контактов по имени или номеру телефона на основе filterWord
    return contacts.filter(
      contact =>
        contact.name.toLowerCase().includes(filterWord.toLowerCase().trim()) || // Проверка наличия filterWord в имени контакта
        contact.number.toString().includes(filterWord.toLowerCase().trim()) // Проверка наличия filterWord в номере телефона контакта
    );
  }
);
