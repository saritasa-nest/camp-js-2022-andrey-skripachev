import { createSlice } from '@reduxjs/toolkit';

import { fetchUser } from './dispatchers';
import { initialState } from './state';

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => builder
    .addCase(fetchUser.pending, state => {
      state.isLoading = true;
    })
    .addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    })
    .addCase(fetchUser.rejected, (state, action) => {
      if (action.error.message) {
        state.error = action.error.message;
      }
      state.isLoading = false;
    }),
});
