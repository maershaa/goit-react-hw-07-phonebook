import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchContacts } from 'redux/operation';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './Contacts/ContactsList';
import Filter from './Filter/Filter';
import css from './App.module.css';

const App = () => {
  // Локальное состояние для отслеживания активной вкладки
  const [activeTab, setActiveTab] = useState('form');
  const dispatch = useDispatch();

  // Функция для изменения активной вкладки
  const handleTabChange = tab => {
    setActiveTab(tab);
  };

  // !размещено тут чтобы если списко контатков не изменился, то и запрос по 100 раз делать не нужно
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className={css.container}>
      <h1>Phonebook</h1>

      {/* Компоненты для переключения между вкладками */}
      <div className={css.tabs}>
        {/* Кнопка для переключения на форму добавления контакта */}
        <button
          onClick={() => handleTabChange('form')}
          className={activeTab === 'form' ? css.activeTab : ''}
        >
          Contact Form
        </button>

        {/* Кнопка для переключения на фильтр и список контактов */}
        <button
          onClick={() => handleTabChange('list')}
          className={activeTab === 'list' ? css.activeTab : ''}
        >
          Contact List
        </button>
      </div>

      {/* Контент соответствующей вкладки */}
      <div className={css.tabContent}>
        {/* Если активная вкладка - форма добавления контакта */}
        {activeTab === 'form' && <ContactForm />}

        {/* Если активная вкладка - список контактов */}
        {activeTab === 'list' && (
          <div className={css.contactsAndSearchWrapper}>
            <Filter />
            <ContactList />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
