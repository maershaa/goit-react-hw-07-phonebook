import React, { useEffect } from 'react';
import css from 'components/Contacts/Contacts.module.css';
import Contact from 'components/Contacts/Contact/Contact';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from 'redux/operation';
import {
  selectContacts,
  selectContactsIsLoading,
  selectContactsError,
  selectFilteredContacts,
} from 'redux/selectors';
import Loader from 'components/Loader/Loader';

export const ContactsList = () => {
  const dispatch = useDispatch();

  const isLoading = useSelector(selectContactsIsLoading);
  const error = useSelector(selectContactsError);
  const filteredContacts = useSelector(selectFilteredContacts);
  const contacts = useSelector(selectContacts); // Получение списка контактов из состояния Redux

  // !Как сделать так чтобы если списко контатков не изменился, то и запрос по 100 раз делать не нужно
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  // Сортировка отфильтрованных контактов по статусу избранного
  const sortedContacts = [...filteredContacts].sort(
    (a, b) => b.isFavourite - a.isFavourite
  );
  console.log('sortedProducts', sortedContacts);

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
