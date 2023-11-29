import React, { useEffect } from 'react';
import css from 'components/Contacts/Contacts.module.css';
import Contact from 'components/Contacts/Contact/Contact';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from 'redux/operation';
import {
  // selectContacts,
  selectContactsIsLoading,
  selectContactsError,
  // selectContactsIsFavourite,
  // selectContactsFavouriteContacts,
  // selectFilter,
  selectFilteredContacts,
} from 'redux/selectors';
import Loader from 'components/Loader/Loader';

export const ContactsList = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectContactsIsLoading);
  const error = useSelector(selectContactsError);
  const filteredContacts = useSelector(selectFilteredContacts);
  // Получаем значение, указывающее на то, были ли контакты уже загружены из состояния Redux
  const contactsLoaded = useSelector(
    state => state.contactsStore.contacts.items.length > 0
  );

  useEffect(() => {
    // Проверяем, есть ли контакты в хранилище Redux и были ли они уже загружены
    if (!contactsLoaded) {
      // Если контактов нет или они еще не были загружены, отправляем запрос на загрузку
      dispatch(fetchContacts());
    }
  }, [dispatch, contactsLoaded]);

  // Функция для фильтрации контактов в соответствии с текущим фильтром +useMemo
  //!Вместонее используем сложенный селектор в selectors.js с именем selectFilteredContacts при попощи createSelector
  // !useMemo = createSelector
  // const getFilteredContacts = useMemo(() => {
  //   return () => {
  //     console.log(filterWord);
  //     if (!contacts || !contacts.length) {
  //       return [];
  //     }
  //     return contacts.filter(
  //       ({ name, number }) =>
  //         name.toLowerCase().includes(filterWord.toLowerCase().trim()) ||
  //         number.toString().includes(filterWord.toLowerCase().trim())
  //     );
  //   };
  // }, [contacts, filterWord]);

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
            number={contact.phone}
          />
        ))}
      </ul>
    </div>
  );
};

export default ContactsList;
