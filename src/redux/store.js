// ! ПРИМЕР
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { contactsReducer } from 'redux/reducer';
// import { persistStore, persistReducer } from 'redux-persist';

// !состояние не будет сохраняться между перезагрузками страницы.
// Объединяем редукторы
const rootReducer = combineReducers({
  contactsStore: contactsReducer, // Объединяем редуктор контактов под ключом "contactsStore"
  devTools: process.env.NODE_ENV !== 'production', // Включение DevTools только в development-среде
});

// Создаем хранилище с помощью configureStore и передаем ему корневой редуктор
export const store = configureStore({
  reducer: rootReducer, // Передаем корневой редуктор как основу для хранилища
});

// !сохранение состояния в локальном хранилище припомощи redux-persist
// import storage from 'redux-persist/lib/storage';
// const rootReducer = combineReducers({
//   contactsStore: contactsReducer, // Объединяем редуктор контактов под ключом "contactsStore"
//   devTools: process.env.NODE_ENV !== 'production', // Включение DevTools только в development-среде
// });

// Конфигурация персистентности для сохранения состояния
// const persistConfig = {
//   key: 'root', // Ключ корневого объекта в локальном хранилище
//   storage, // Используемое хранилище (localStorage, AsyncStorage и т. д.)
// };

// Создаем персистентный редуктор, который сохраняет состояние в локальном хранилище
// const persistedReducer = persistReducer(persistConfig, rootReducer);

// Создаем хранилище с помощью configureStore и передаем ему корневой персистентный редуктор
// export const store = configureStore({
//   reducer: persistedReducer, // Передаем корневой персистентный редуктор как основу для хранилища
// });

// Создаем persistor для отслеживания и обеспечения сохранения состояния хранилища
// export const persistor = persistStore(store);
