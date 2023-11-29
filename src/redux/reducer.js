import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from 'redux/operation';

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
  extraReducers: builder => {
    builder
      // Обработка успешного завершения fetchContacts и fetchAddContact
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        // Добавляем полученные контакты к текущему списку
        state.contacts.items.push(...action.payload);
        state.contacts.error = null;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        // Заменяем все контакты на полученный список контактов
        state.contacts.items = action.payload;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = null;
        // Удаляем контакт из списка по его id
        const index = state.contacts.items.findIndex(
          contact => contact.id === action.payload
        );
        if (index !== -1) {
          state.contacts.items.splice(index, 1);
        }
      })
      // Обработка событий ожидания fetchContacts и fetchAddContact
      .addMatcher(
        isAnyOf(
          fetchContacts.pending,
          addContact.pending,
          deleteContact.pending
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
          deleteContact.rejected
        ),
        (state, { payload }) => {
          state.contacts.isLoading = false;
          state.contacts.error = payload;
        }
      );
  },
});
// Экспорт экшенов и редьюсера
// !Это потом вроде нужно удалить будет
export const { filterContact, toggleFavourite } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
