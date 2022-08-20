import { createSlice } from '@reduxjs/toolkit';

import { fetchAnimeList, fetchNextPageOfAnimeList } from './dispatchers';
import { initialState } from './state';

export const animeListSlice = createSlice({
  name: 'animeList',
  initialState,
  reducers: {},
  extraReducers: builder => builder
    .addCase(fetchAnimeList.pending, state => {
      state.isLoading = true;
    })
    .addCase(fetchAnimeList.fulfilled, (state, action) => {
      state.animeList = [...action.payload.results];
      state.isLoading = false;
      state.nextPage = action.payload.next;
    })
    .addCase(fetchAnimeList.rejected, (state, action) => {
      if (action.error.message) {
        state.error = action.error.message;
      }
      state.isLoading = false;
    })
    .addCase(fetchNextPageOfAnimeList.pending, state => {
      state.isLoading = true;
    })
    .addCase(fetchNextPageOfAnimeList.fulfilled, (state, action) => {
      state.animeList = [...state.animeList, ...action.payload.results];
      state.isLoading = false;
      state.nextPage = action.payload.next;
    })
    .addCase(fetchNextPageOfAnimeList.rejected, (state, action) => {
      if (action.error.message) {
        state.error = action.error.message;
      }
      state.isLoading = false;
    }),
});
