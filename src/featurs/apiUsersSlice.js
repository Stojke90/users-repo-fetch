import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getUsers = createAsyncThunk('users/getUsers', async (username) => {
  return fetch(`https://api.github.com/search/users?q=${username}`).then(
    (res) => res.json()
  );
});

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    list: [],
    status: null,
  },
  extraReducers: {
    [getUsers.pending]: (state, action) => {
      state.status = 'loading';
    },
    [getUsers.fulfilled]: (state, { payload }) => {
      state.list = payload;
      state.status = 'success';
    },
    [getUsers.rejected]: (state, action) => {
      state.status = 'failed';
    },
  },
});

export default usersSlice.reducer;
