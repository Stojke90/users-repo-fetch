import React from 'react';
import { Link } from 'react-router-dom';

const UserCard = ({ data }) => {
  return (
    <article className='card'>
      <div className='halfWidth'>
        <Link to={`/userRepo/${data?.login}`}>
          <img
            src={data?.avatar_url}
            alt={`avatar-${data?.login}`}
          />
        </Link>
      </div>

      <div className='halfWidth'>
        <p className='userName'>{data?.login}</p>
        <p
          style={{
            color: data?.description ? 'initial' : 'red',
            fontSize: data?.description ? '0.6rem' : '0.8rem',
          }}>
          {data?.description
            ? data?.description
            : 'No description for this repo.'}
        </p>
      </div>
    </article>
  );
};

export default UserCard;
