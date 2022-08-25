import { createSlice } from '@reduxjs/toolkit';

import { fetchAnimeById, setAnimeId } from './dispatchers';
import { entityAdapter, initialState } from './state';

/** AMOGUS */
export const animeSlice = createSlice({
  name: 'anime',
  initialState: {
    ...entityAdapter.getInitialState(),
    ...initialState,
  },
  reducers: {},
  extraReducers: builder => builder
    .addCase(setAnimeId.pending, state => {
      state.isLoading = true;
    })
    .addCase(setAnimeId.fulfilled, (state, action) => {
      state.animeId = action.payload;
      state.isLoading = false;
    })
    .addCase(fetchAnimeById.pending, state => {
      state.isLoading = true;
      state.currentAnime = undefined;
    })
    .addCase(fetchAnimeById.fulfilled, (state, action) => {
      const currentAnime = action.payload;
      state.currentAnime = action.payload;
      entityAdapter.addOne(state, currentAnime);
      state.isLoading = false;
    })
    .addCase(fetchAnimeById.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    }),
});
