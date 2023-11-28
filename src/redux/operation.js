import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://655e5ee89722d515ea1652fe.mockapi.io';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  // Використовуємо символ підкреслення як ім'я першого параметра,
  // тому що в цій операції він нам не потрібен
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/contacts');
      // При успішному запиті повертаємо проміс із даними
      return response.data;
    } catch (e) {
      // При помилці запиту повертаємо проміс
      // який буде відхилений з текстом помилки
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

// Добавление нового контакта (метод POST)
export const fetchAddContact = createAsyncThunk(
  'contacts/addContact',
  async (newContactData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/contacts', newContactData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Удаление контакта (метод DELETE)
export const fetchDeleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`/contacts/${id}`);
      return id; // Возвращаем id удаленного контакта
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
