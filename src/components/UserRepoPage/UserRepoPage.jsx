import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';

const UserRepoPage = () => {
  // local state for set users repos
  const [repos, setRepos] = useState([]);
  // state for show loader
  const [showLoader, setShowLoader] = useState(false);
  // state for error handler
  const [error, setError] = useState(false);
  let { id } = useParams();

  useEffect(() => {
    setShowLoader(true);
    setError(false);
    axios(`https://api.github.com/users/${id}/repos`)
      .then((res) => {
        if (res.status >= 200 && res.status <= 299) {
          setRepos(res.data);
          setShowLoader(false);
        }
      })
      .catch((error) => {
        console.warn(error.message);
        setError(true);
        setShowLoader(false);
      });
  }, [id]);

  return (
    <div>
      <h2 className='repoTitle'>
        <FontAwesomeIcon icon={faChevronRight} />{' '}
        <span className='userName'>{id}</span> repositoriums{' '}
        <FontAwesomeIcon icon={faChevronLeft} />
      </h2>

      <Link
        to={'/'}
        className='backBtn'>
        <FontAwesomeIcon icon={faChevronLeft} />
        Back
      </Link>

      {repos.length > 0 && (
        <div className='repoCardWraper'>
          {repos.map((data) => (
            <article
              className='repoCardCon'
              key={uuidv4()}>
              <p className='repoCardTitle'>{data?.name.split('-').join(' ')}</p>
              <span>Description: </span>
              <p
                className='repoParagraph indentedParagraph'
                style={{
                  color: data?.description === null ? 'red' : '#fff',
                }}>
                {data?.description !== null
                  ? data?.description
                  : 'No description for this repo.'}
              </p>
              <p className='repoParagraph'>
                <span>Create date:</span>{' '}
                {data?.created_at.split('T')[0].split('-').reverse().join('/')}
              </p>
              <p className='repoCounts'>Counts</p>
              <p className='countText'>
                <span>Stargazers:</span>{' '}
                {data.stargazers_count !== null &&
                data.stargazers_count !== undefined
                  ? data.stargazers_count
                  : 'N/A'}
              </p>
              <p className='countText'>
                <span>Watchers:</span>{' '}
                {data.watchers_count !== null &&
                data.watchers_count !== undefined
                  ? data.watchers_count
                  : 'N/A'}
              </p>
              <p className='countText'>
                <span>Forks:</span>{' '}
                {data.forks_count !== null && data.forks_count !== undefined
                  ? data.forks_count
                  : 'N/A'}
              </p>
              <a
                href={data?.html_url}
                disabled={data.html_url ? false : true}
                target='_blank'
                rel='noreferrer'>
                Redirect
              </a>
            </article>
          ))}
        </div>
      )}

      {showLoader && <div className='loader' />}

      {error && (
        <p className='errorMsg'>Data was not loaded, an error occurred!!!</p>
      )}

      {repos.length === 0 && !showLoader && (
        <p className='errorMsg'>User dont have any repositorium.</p>
      )}
    </div>
  );
};

export default UserRepoPage;
