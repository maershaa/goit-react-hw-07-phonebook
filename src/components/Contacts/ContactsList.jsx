import React from 'react';
import css from 'components/Contacts/Contacts.module.css';
import Contact from 'components/Contacts/Contact/Contact';
import { useSelector } from 'react-redux';
import {
  selectContacts,
  selectContactsIsLoading,
  selectContactsError,
  selectFilteredContacts,
} from 'redux/selectors';
import Loader from 'components/Loader/Loader';

export const ContactsList = () => {
  const isLoading = useSelector(selectContactsIsLoading);
  const error = useSelector(selectContactsError);
  const filteredContacts = useSelector(selectFilteredContacts);
  const contacts = useSelector(selectContacts); // Получение списка контактов из состояния Redux

  // Сортировка отфильтрованных контактов по статусу избранного
  const sortedContacts = [...filteredContacts].sort(
    (a, b) => b.isFavourite - a.isFavourite
  );
  // console.log('sortedProducts', sortedContacts);

  // Проверяем, что contacts является массивом и имеет длину больше нуля, чтобы убедиться, что в хранилище есть контакты
  const showContacts = Array.isArray(contacts) && contacts.length > 0;

  return (
    <div className={css.contactsContainer}>
      {error !== null && (
        <p className="errorBadge">
          Oops, some error occurred... No contacts found. {error}
        </p>
      )}

      {isLoading && <Loader />}
      <ul className={css.contactsList}>
        {showContacts &&
          sortedContacts.map(contact => (
            <Contact
              key={contact.id}
              id={contact.id}
              name={contact.name}
              number={contact.phone}
            />
          ))}
      </ul>
    </div>
  );
};

export default ContactsList;
