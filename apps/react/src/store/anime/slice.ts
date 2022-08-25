import { createSlice } from '@reduxjs/toolkit';

import { fetchAnimeById } from './dispatchers';
import { entityAdapter, initialState, State } from './state';

export const animeSlice = createSlice({
  name: 'anime',
  initialState,
  reducers: {},
  extraReducers: builder => builder
    .addCase(fetchAnimeById.pending, state => {
      state.isLoading = true;
    })
    .addCase(fetchAnimeById.fulfilled, (state, action) => {
      if (action.payload !== null) {
        entityAdapter.addOne(state as State, action.payload);
      }
      state.isLoading = false;
    })
    .addCase(fetchAnimeById.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    }),
});
