import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SearchPage from './components/SearchPage/SearchPage';
import SearchResults from './components/SearchResults/SearchResults';
import UserRepoPage from './components/UserRepoPage/UserRepoPage';

const App = () => {
  return (
    <>
      <SearchPage />
      <Routes>
        <Route
          path='/'
          element={<SearchResults />}
        />
        <Route
          path='/userRepo/:id'
          element={<UserRepoPage />}
        />
      </Routes>
    </>
  );
};

export default App;
