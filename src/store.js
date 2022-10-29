import { configureStore } from '@reduxjs/toolkit';
import usersReducers from './featurs/apiUsersSlice';

export default configureStore({
  reducer: {
    users: usersReducers,
  },
});
