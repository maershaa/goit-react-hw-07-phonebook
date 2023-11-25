import React, { useEffect } from 'react';
import css from 'components/Contacts/Contacts.module.css';
import Contact from 'components/Contacts/Contact/Contact';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from 'redux/operation';
import {
  selectContacts,
  selectContactsIsLoading,
  selectContactsError,
  // selectContactsIsFavourite,
  // selectContactsFavouriteContacts,
  selectFilter,
} from 'redux/selectors';
import Loader from 'components/Loader/Loader';

export const ContactsList = () => {
  const dispatch = useDispatch();

  const contacts = useSelector(selectContacts);
  const filterWord = useSelector(selectFilter);

  const isLoading = useSelector(selectContactsIsLoading);
  const error = useSelector(selectContactsError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  // Функция для фильтрации контактов в соответствии с текущим фильтром
  const getFilteredContacts = () => {
    console.log(filterWord);
    if (!contacts || !contacts.length) {
      return []; // Возвращает пустой массив, если контактов нет или contacts не определен
    }
    return contacts.filter(
      ({ name, number }) =>
        name.toLowerCase().includes(filterWord.toLowerCase().trim()) ||
        number.toString().includes(filterWord.toLowerCase().trim())
    );
  };

  const filteredContacts = getFilteredContacts(); // Получаем отфильтрованные контакты

  return (
    <div className={css.contactsContainer}>
      {error !== null && (
        <p className="errorBadge">
          Oops, some error occurred... No contacts found. {error}
        </p>
      )}

      {isLoading && <Loader />}
      <ul className={css.contactsList}>
        {filteredContacts.map(contact => (
          <Contact
            key={contact.id}
            id={contact.id}
            name={contact.name}
            number={contact.number}
          />
        ))}
      </ul>
    </div>
  );
};

export default ContactsList;
