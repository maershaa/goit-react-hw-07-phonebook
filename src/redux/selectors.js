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
  // Зависимости для селектора: selectContacts - селектор контактов, selectFilter - селектор фильтра
  [selectContacts, selectFilter],
  // Функция, которая принимает данные из селекторов и применяет фильтрацию
  (contacts, filterWord) => {
    // console.log('Input contacts:', contacts);
    // console.log('Input filterWord:', filterWord);

    // Приводим значение фильтра к нижнему регистру и удаляем лишние пробелы
    const formattedFilterWord = filterWord.toLowerCase().trim();

    // Фильтрация контактов:
    // Возвращаем только те контакты, чьи имена или номера телефонов содержат значение форматированного фильтра
    return contacts.filter(
      contact =>
        contact.name.toLowerCase().includes(formattedFilterWord) || // Проверка наличия форматированного фильтра в имени контакта
        contact.phone.toString().includes(formattedFilterWord) // Проверка наличия форматированного фильтра в номере телефона контакта
    );
  }
);
