import React, { useState } from 'react';
import css from 'components/ContactForm/ContactForm.module.css';
import { addContact } from 'redux/operation';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts } from 'redux/selectors';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  // Обработчик отправки формы
  const handleSubmit = evt => {
    evt.preventDefault();

    // Приводим введенное имя к нижнему регистру для сравнения
    const normalizeName = name.toLowerCase();

    // Проверяем, есть ли контакт с таким именем в контактах
    const isDuplicate = contacts.some(
      contact => contact.name.toLowerCase() === normalizeName
    );

    // Если найден дубликат, выводим сообщение об этом
    if (isDuplicate) {
      alert(`${name} уже есть в контактах`);
      return;
    }

    // Отправляем новый контакт в Redux хранилище
    dispatch(addContact({ name, number }));
    reset();
  };

  // Обработчик изменения значений полей input
  const handleChange = evt => {
    const { name, value } = evt.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    }
  };

  // Функция для сброса значений полей в исходное состояние
  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <label htmlFor="name" className={css.formLabel}>
        <input
          type="text"
          name="name"
          pattern={
            "^[a-zA-Zа-яА-Я]+(([' \\-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          }
          title="Name may contain only letters, apostrophe, dash, and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={handleChange}
          id={name}
          className={css.inputText}
          placeholder="Name"
        />
      </label>

      <label htmlFor="number" className={css.formLabel}>
        <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses, and can start with +"
          required
          value={number}
          onChange={handleChange}
          id={number}
          className={css.inputText}
          placeholder="Number"
        />
      </label>

      <button type="submit" className={css.addButton}>
        Save
      </button>
    </form>
  );
};

export default ContactForm;
