import { createSlice } from '@reduxjs/toolkit';

import { fetchAnimeList } from './dispatchers';
import { AnimeStateType, entityAdapter, initialState } from './state';

export const animeListSlice = createSlice({
  name: 'animeList',
  initialState: {
    ...entityAdapter.getInitialState(),
    ...initialState,
  },
  reducers: {},
  extraReducers: builder => builder
    .addCase(fetchAnimeList.pending, state => {
      state.isLoading = true;
    })
    .addCase(fetchAnimeList.fulfilled, (state, action) => {
      entityAdapter.setAll(state as AnimeStateType, action.payload.results);
      state.isLoading = false;
      state.nextPage = action.payload.next;
    })
    .addCase(fetchAnimeList.rejected, (state, action) => {
      if (action.error.message) {
        state.error = action.error.message;
      }
      state.isLoading = false;
    }),
});
