import React from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import UserCard from './UserCard';

const SearchResults = () => {
  const { list, status } = useSelector((state) => state.users);
  console.log('SearchResults-items: ', list.items);
  console.log('SearchResults-status: ', status);
  return (
    <section className='searchResultsCon'>
      {status === null && (
        <p className='hintText'>
          Start typing in the search box to find the user
        </p>
      )}

      {status === 'loading' && <div className='loader' />}

      {list?.items?.length > 0 && status === 'success' && (
        <div className='conForCards'>
          <h2 className='titleUsers'>Users</h2>
          {list?.items?.map((data) => (
            <UserCard
              key={uuidv4()}
              data={data}
            />
          ))}
        </div>
      )}

      {status === 'success' && list?.items?.length === 0 && (
        <p className='hintText'>No users with this name</p>
      )}

      {status === 'failed' && (
        <p className='hintText'>Data was not loaded, an error occurred!!!</p>
      )}
    </section>
  );
};

export default SearchResults;
