import React from 'react';
import css from 'components/Filter/Filter.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { filterContact } from 'redux/reducer';
import { selectFilter } from 'redux/selectors';

const Filter = () => {
  const dispatch = useDispatch();
  const filterWord = useSelector(selectFilter);

  const handleFilterChange = e => {
    const newFilterValue = e.target.value;
    dispatch(filterContact(newFilterValue));
  };

  return (
    <input
      type="text"
      name="nameFilter"
      value={filterWord}
      pattern={"^[a-zA-Zа-яА-Я]+(([' \\-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"}
      onChange={handleFilterChange}
      placeholder="Search by name"
      className={css.inputText}
    />
  );
};

export default Filter;
