import React from 'react';
import css from 'components/Filter/Filter.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setFilterWord } from 'redux/reducer';
import { selectFilter } from 'redux/selectors';

const Filter = () => {
  const dispatch = useDispatch();

  // Используем useSelector для получения текущего значения фильтра из состояния Redux
  const filterWord = useSelector(selectFilter);
  console.log(filterWord);

  // Обработчик изменения значения фильтра
  const handleFilterChange = e => {
    // Получаем новое значение фильтра из события изменения поля ввода
    const newFilterValue = e.target.value;
    console.log(newFilterValue);

    // Диспетчеризация экшена filterContact для обновления фильтра в состоянии Redux
    dispatch(setFilterWord(newFilterValue));
  };

  // Возвращаем JSX элемент с полем ввода для фильтрации по имени контакта
  return (
    <input
      type="text"
      name="filterWord"
      // Паттерн для разрешенных символов в поле ввода
      pattern={"^[a-zA-Zа-яА-Я]+(([' \\-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"}
      // Обработчик изменения значения в поле ввода
      onChange={handleFilterChange}
      // Placeholder для поля ввода
      placeholder="Search by name"
      // CSS класс для стилизации поля ввода
      className={css.inputText}
    />
  );
};

export default Filter;
