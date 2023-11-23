import React from 'react';
import css from 'components/Filter/Filter.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { filterContact } from 'redux/reducer';

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.contactsStore.filter);

  const handleFilterChange = e => {
    const newFilterValue = e.target.value;
    dispatch(filterContact(newFilterValue));
  };

  return (
    <input
      type="text"
      name="nameFilter"
      value={filter}
      pattern={"^[a-zA-Zа-яА-Я]+(([' \\-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"}
      onChange={handleFilterChange}
      placeholder="Search by name"
      className={css.inputText}
    />
  );
};

export default Filter;
