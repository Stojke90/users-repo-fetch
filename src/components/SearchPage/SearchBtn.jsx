import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { getUsers } from '../../featurs/apiUsersSlice';
import { useNavigate, useLocation } from 'react-router-dom';

const SearchBtn = () => {
  // state for check if input is focus
  const [focused, setFocused] = useState(false);
  // local state for input search value
  const [searchInputValue, setSearchInputValue] = useState('');
  // fetch users from api redux-toolkit
  const dispatch = useDispatch();
  // from react router to get location of page
  let location = useLocation();
  // from react router to redirect to other url(difrent page)
  let navigate = useNavigate();
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  // on every rerender check is input focues and press enter
  useEffect(() => {
    const keyDownHandler = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (focused === true) {
          fetchUsers(searchInputValue);
        }
      }
    };

    document.addEventListener('keydown', keyDownHandler);
    return () => document.removeEventListener('keydown', keyDownHandler);
  });

  // fetch users,if is on user repo page,redirect to users res page
  const fetchUsers = (name) => {
    if (name.length >= 2) {
      dispatch(getUsers(name));
      if (location.pathname !== '/') {
        navigate('/');
      }
    } else {
      console.warn('Manje od 2 karaktera');
    }
  };

  return (
    <section title='At least two letters are required!!!'>
      <input
        type='text'
        placeholder='Type to serach user'
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={(e) => setSearchInputValue(e.target.value)}
      />
      <button
        className='btnSearch'
        onClick={() => fetchUsers(searchInputValue)}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </section>
  );
};

export default SearchBtn;
