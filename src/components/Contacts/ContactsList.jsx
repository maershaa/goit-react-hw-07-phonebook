import React from 'react';
import css from 'components/Contacts/Contacts.module.css';
import Contact from 'components/Contacts/Contact/Contact';
import { useSelector } from 'react-redux';

export const ContactsList = () => {
  const contacts = useSelector(state => state.contactsStore.contacts);
  const filter = useSelector(state => state.contactsStore.filter);

  // ! куда оно?
  // Функция для фильтрации контактов в соответствии с текущим фильтром
  const getFilteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const filteredContacts = getFilteredContacts(); // Получаем отфильтрованные контакты

  return (
    <div className={css.contactsContainer}>
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
