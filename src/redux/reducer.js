import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  fetchContacts,
  fetchAddContact,
  fetchDeleteContact,
} from 'redux/operation';

// ! ПРИМЕР Redux Toolkit
// Начальное состояние хранилища
const initialState = {
  // Состояние для контактов
  contacts: {
    items: [], // Массив контактов
    isLoading: false, // Флаг загрузки
    error: null, // Ошибка (если есть)
    isFavourite: false, // Флаг для отдельного контакта - избранный или нет
    favouriteContacts: [], // Массив избранных контактов
  },
  filterWord: '', // Фильтр для поиска контактов
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact(state, action) {
      const newContact = action.payload;
      newContact.isFavourite = false; // Новый контакт всегда начинается как не избранный
      // Добавление нового контакта в массив items
      state.contacts.items.push(newContact);
      // !Можно также использовать деструктивное присваивание:
      // state.contacts.items = [...state.contacts.items, action.payload];
    },
    deleteContact(state, action) {
      console.log('Action payload (contact ID to delete):', action.payload);
      // Удаление контакта из массива items по id
      state.contacts.items = state.contacts.items.filter(
        contact => contact.id !== action.payload
      );
    },
    filterContact(state, action) {
      // Обновление значения фильтра контактов
      state.contacts.filterWord = action.payload;
    },
    toggleFavourite(state, action) {
      const contactId = action.payload;
      const foundContact = state.contacts.items.find(
        contact => contact.id === contactId
      );
      if (foundContact) {
        console.log('Found contact', foundContact);
        // Изменение флага isFavourite контакта на противоположное значение
        foundContact.isFavourite = true;
        // Обновление массива избранных контактов в зависимости от значения isFavourite
        if (foundContact.isFavourite) {
          state.contacts.favouriteContacts.push(foundContact);
          console.log(
            'Added to favouriteContacts:',
            state.contacts.favouriteContacts
          );
        } else {
          state.contacts.favouriteContacts =
            state.contacts.favouriteContacts.filter(
              contact => contact.id !== contactId
            );
          console.log(
            'Removed from favouriteContacts:',
            state.contacts.favouriteContacts
          );
        }
      }
    },
  },
  extraReducers: builder => {
    builder
      // Обработка успешного завершения fetchContacts и fetchAddContact
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.items = action.payload;
        state.contacts.error = null;
      })
      .addCase(fetchAddContact.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.items = action.payload;
      })
      .addCase(fetchDeleteContact.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.items = action.payload;
      })
      // Обработка событий ожидания fetchContacts и fetchAddContact
      .addMatcher(
        isAnyOf(
          fetchContacts.pending,
          fetchAddContact.pending,
          fetchDeleteContact.pending
        ),
        state => {
          state.contacts.isLoading = true;
          state.contacts.error = null;
        }
      )
      // Обработка отклоненных запросов fetchContacts и fetchAddContact
      .addMatcher(
        isAnyOf(
          fetchContacts.rejected,
          fetchAddContact.rejected,
          fetchDeleteContact.rejected
        ),
        (state, { payload }) => {
          state.isLoading = false;
          state.error = payload;
        }
      );
  },
});

// Экспорт экшенов и редьюсера
export const { addContact, deleteContact, filterContact, toggleFavourite } =
  contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
