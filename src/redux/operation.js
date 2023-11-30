import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://655e5ee89722d515ea1652fe.mockapi.io';

// Загрузка всех контактов
export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  // В первом параметре обычно передается payload, но здесь он не нужен, используем '_'
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/contacts');
      console.log('fetchContacts', response.data);
      // Возвращаем данные при успешном запросе
      return response.data;
    } catch (e) {
      // При ошибке возвращаем отклоненное значение с текстом ошибки
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

// Добавление нового контакта (метод POST)
export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (inputText, thunkAPI) => {
    try {
      const response = await axios.post('/contacts', { inputText });
      console.log('addContact', response.data.inputText);
      // !Возвращаем данные добавленного контакта (response.data=новый контакт сгенерированный случайным образом  не наш контакт  потому обращаемся к inputText)
      return response.data.inputText;
    } catch (error) {
      // В случае ошибки возвращаем отклоненное значение с текстом ошибки
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Удаление контакта (метод DELETE)
export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, thunkAPI) => {
    try {
      const { data } = await axios.delete(`/contacts/${contactId}`);
      console.log('deleteContact contactId', contactId);
      console.log('deleteContact data', data);
      return data;
    } catch (error) {
      // В случае ошибки возвращаем отклоненное значение с текстом ошибки
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Изменение статуса "избранного" у контакта (метод PUT)
export const toggleIsFavourite = createAsyncThunk(
  'contacts/toggleIsFavourite',
  async (contactId, thunkAPI) => {
    try {
      // Получаем информацию о контакте по ID
      const response = await axios.get(`/contacts/${contactId}`);
      const { isFavourite } = response.data;

      // Обновляем статус "избранного" на противоположный
      const updatedResponse = await axios.put(`/contacts/${contactId}`, {
        isFavourite: !isFavourite,
      });

      console.log('toggleIsFavourite', updatedResponse.data);

      // Возвращаем обновленные данные контакта
      return updatedResponse.data;
    } catch (error) {
      // В случае ошибки возвращаем отклоненное значение с текстом ошибки
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
