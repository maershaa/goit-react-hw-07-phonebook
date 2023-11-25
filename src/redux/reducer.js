// ! ПРИМЕР Redux Toolkit
import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts } from 'redux/operation';

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
      console.log('Current state:', state); // Логируем текущее состояние
      console.log('Payload:', action.payload); // Логируем action.payload
      // ! чего этот код не подходит?
      // state.contacts.items.push(action.payload);
      state.contacts.items = [...state.contacts.items, action.payload];
      console.log('Updated state:', state); // Логируем обновленное состояние
    },
    deleteContact(state, action) {
      state.contacts.items = state.contacts.items.filter(
        contact => contact.id !== action.payload
      );
    },
    filterContact(state, action) {
      state.contacts.filterWord = action.payload;
    },
    toggleFavourite(state, action) {
      const contactId = action.payload;
      const existingContact = state.contacts.items.find(
        contact => contact.id === contactId
      );

      if (existingContact) {
        existingContact.isFavourite = !existingContact.isFavourite;

        if (existingContact.isFavourite) {
          state.contacts.favouriteContacts.push(existingContact);
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
    builder.addCase(fetchContacts.pending, state => {
      state.contacts.isLoading = true;
    });
    builder.addCase(fetchContacts.fulfilled, (state, action) => {
      state.contacts.isLoading = false;
      state.contacts.error = null;
      state.contacts.items = action.payload;
    });
    builder.addCase(fetchContacts.rejected, (state, action) => {
      state.contacts.isLoading = false;
      state.contacts.error = action.payload;
    });
  },
});

export const { addContact, deleteContact, filterContact, toggleFavourite } =
  contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
