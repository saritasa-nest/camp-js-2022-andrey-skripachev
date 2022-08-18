import { createSlice } from '@reduxjs/toolkit';

import { fetchUser, logoutUser } from './dispatchers';
import { initialState } from './state';

// TODO (Andrey S.): Write user normalizer.
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
    })
    .addCase(logoutUser.fulfilled, state => {
      state.user = null;
    }),
});
