import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { fetchContacts, fetchAddContact } from 'redux/operation';

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
      // Переключение флага избранного для контакта
      const contactId = action.payload;
      const existingContact = state.contacts.items.find(
        contact => contact.id === contactId
      );

      if (existingContact) {
        // Изменение флага isFavourite контакта
        existingContact.isFavourite = !existingContact.isFavourite;

        // Добавление или удаление контакта из массива избранных контактов
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
    builder
      // Обработка успешного завершения fetchContacts и fetchAddContact
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.items = action.payload;
      })
      .addCase(fetchAddContact.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.items = action.payload;
      })
      // Обработка событий ожидания fetchContacts и fetchAddContact
      .addMatcher(
        isAnyOf(fetchContacts.pending, fetchAddContact.pending),
        state => {
          state.contacts.isLoading = true;
          state.contacts.error = null;
        }
      )
      // Обработка отклоненных запросов fetchContacts и fetchAddContact
      .addMatcher(
        isAnyOf(fetchContacts.rejected, fetchAddContact.rejected),
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
