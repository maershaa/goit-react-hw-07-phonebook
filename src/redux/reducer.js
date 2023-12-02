import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  fetchContacts,
  addContact,
  deleteContact,
  toggleIsFavourite,
} from 'redux/operation';

// ! ПРИМЕР Redux Toolkit
/// Начальное состояние хранилища
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
    setFilterWord(state, action) {
      state.filterWord = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      // Обработка успешного завершения
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        // Добавляем полученные контакты к текущему списку
        state.contacts.items = action.payload;
        state.contacts.error = null;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.items = [...state.contacts.items, action.payload];
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = null;
        state.contacts.items = state.contacts.items.filter(
          item => item.id !== action.payload.id
        );
        // const index = state.contacts.items.findIndex(
        //   contact => [contact.id] === [action.payload.id]
        // );
        // state.contacts.items.splice(index, 1);
      })
      .addCase(toggleIsFavourite.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = null;
        // Обновление isFavourite элемента по его id
        state.contacts.items = state.contacts.items.map(contact => {
          if (contact.id === action.payload.id) {
            return {
              ...contact,
              isFavourite: !contact.isFavourite, // Переключение isFavourite
            };
          }
          return contact;
        });
      })

      // Обработка событий ожидания fetchContacts и fetchAddContact
      .addMatcher(
        isAnyOf(
          fetchContacts.pending,
          addContact.pending,
          deleteContact.pending,
          toggleIsFavourite.pending
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
          addContact.rejected,
          deleteContact.rejected,
          toggleIsFavourite.rejected
        ),
        (state, { payload }) => {
          state.contacts.isLoading = false;
          state.contacts.error = payload;
        }
      );
  },
});
export const { setFilterWord } = contactsSlice.actions;

// Экспорт экшенов и редьюсера
export const contactsReducer = contactsSlice.reducer;
