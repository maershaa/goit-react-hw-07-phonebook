import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import css from 'components/Contacts/Contact/Contact.module.css';
import { toggleFavourite } from 'redux/actions';
import { deleteContact } from 'redux/operation';
import { selectContactsIsFavourite } from 'redux/selectors';

const Contact = ({ id, name, number }) => {
  const dispatch = useDispatch();
  const isFavourite = useSelector(state =>
    selectContactsIsFavourite(state, id)
  );

  const handleDeleteContact = () => {
    console.log('Deleting contact with ID:', id);
    dispatch(deleteContact(id));
  };

  const handleToggleFavourite = () => {
    dispatch(toggleFavourite(id));
  };

  const isFavouriteSelected = isFavourite ? 'white' : 'none';

  return (
    <li key={id} className={css.item}>
      <div>
        {/* Отображаем имя и номер контакта */}
        <p className={css.phoneName}>{name}</p>
        <p className={css.phoneNumber}> {number}</p>
      </div>

      <ul className={css.iconsList}>
        <li>
          <svg
            onClick={handleToggleFavourite}
            className={css.favouriteIcon}
            width="20px"
            height="20px"
            viewBox="0 0 24 24"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            aria-labelledby="favouriteIconTitle"
            stroke="#ffffff"
            strokeWidth="1"
            strokeLinecap="square"
            strokeLinejoin="miter"
            fill={isFavouriteSelected}
            color="#ffffff"
          >
            <title id="favouriteIconTitle">Favourite</title>
            <path d="M12,21 L10.55,19.7051771 C5.4,15.1242507 2,12.1029973 2,8.39509537 C2,5.37384196 4.42,3 7.5,3 C9.24,3 10.91,3.79455041 12,5.05013624 C13.09,3.79455041 14.76,3 16.5,3 C19.58,3 22,5.37384196 22,8.39509537 C22,12.1029973 18.6,15.1242507 13.45,19.7149864 L12,21 Z" />
          </svg>
        </li>
        <li>
          <svg
            onClick={() => handleDeleteContact(id)}
            className={css.deleteIcon}
            width="20px"
            height="20px"
            viewBox="-3 0 32 32"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <g id="icomoon-ignore"></g>
            <path
              d="M18.723 21.788c-1.151-0.48-3.884-1.423-5.565-1.919-0.143-0.045-0.166-0.052-0.166-0.649 0-0.493 0.203-0.989 0.4-1.409 0.214-0.456 0.468-1.224 0.559-1.912 0.255-0.296 0.602-0.88 0.826-1.993 0.196-0.981 0.104-1.338-0.026-1.673-0.013-0.035-0.028-0.070-0.038-0.105-0.049-0.23 0.018-1.425 0.187-2.352 0.116-0.636-0.030-1.989-0.906-3.108-0.553-0.707-1.611-1.576-3.544-1.696l-1.060 0.001c-1.9 0.12-2.96 0.988-3.513 1.695-0.876 1.119-1.021 2.472-0.905 3.108 0.169 0.928 0.236 2.123 0.188 2.348-0.010 0.039-0.025 0.074-0.039 0.11-0.129 0.335-0.221 0.692-0.025 1.673 0.222 1.113 0.57 1.697 0.826 1.993 0.090 0.688 0.344 1.456 0.559 1.912 0.157 0.334 0.231 0.788 0.231 1.431 0 0.597-0.023 0.604-0.157 0.646-1.739 0.513-4.505 1.513-5.537 1.965-0.818 0.351-1.017 0.98-1.017 1.548s0 2.251 0 2.623c0 0.371 0.22 1.006 1.017 1.006 0.613 0 5.518 0 7.746 0 0.668 0 1.098 0 1.098 0h0.192c0 0 0.437 0 1.115 0 2.237 0 7.135 0 7.747 0 0.796 0 1.017-0.634 1.017-1.006s0-2.055 0-2.623-0.392-1.262-1.209-1.613zM18.876 25.98h-17.827v-2.579c0-0.318 0.093-0.46 0.389-0.587 0.993-0.435 3.741-1.426 5.433-1.926 0.889-0.282 0.889-1.070 0.889-1.646 0-0.801-0.104-1.397-0.331-1.878-0.172-0.366-0.392-1.022-0.468-1.601l-0.041-0.312-0.206-0.238c-0.113-0.13-0.395-0.538-0.59-1.513-0.153-0.759-0.085-0.935-0.031-1.076 0.031-0.076 0.059-0.152 0.081-0.237l0.006-0.022 0.004-0.022c0.106-0.495-0.037-1.962-0.181-2.755-0.067-0.365 0.017-1.401 0.701-2.273 0.417-0.534 1.228-1.19 2.721-1.293l0.992-0.001c1.219 0.083 2.145 0.518 2.753 1.294 0.682 0.872 0.765 1.909 0.699 2.275-0.148 0.814-0.287 2.257-0.179 2.758l0.008 0.039 0.011 0.038c0.015 0.054 0.035 0.108 0.055 0.161l0.010 0.026v0.002c0.059 0.153 0.127 0.326-0.025 1.087-0.196 0.974-0.479 1.384-0.592 1.515l-0.204 0.237-0.041 0.31c-0.077 0.578-0.297 1.237-0.469 1.603-0.247 0.525-0.5 1.157-0.5 1.856 0 0.577 0 1.367 0.918 1.655 1.641 0.485 4.345 1.416 5.448 1.877 0.418 0.179 0.574 0.493 0.574 0.649l-0.006 2.579z"
              fill="#ffffff"
            ></path>
            <path
              d="M23.296 14.965l2.742-2.742-0.743-0.742-2.741 2.742-2.742-2.742-0.742 0.742 2.742 2.742-2.742 2.742 0.742 0.742 2.742-2.742 2.742 2.742 0.742-0.742z"
              fill="#ffffff"
            ></path>
          </svg>
        </li>
      </ul>
    </li>
  );
};

export default Contact;
