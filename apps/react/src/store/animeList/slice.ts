import { createSlice } from '@reduxjs/toolkit';

import { fetchAnimeList, fetchNextPageOfAnimeList } from './dispatchers';
import { entityAdapter, initialState } from './state';

export const animeListSlice = createSlice({
  name: 'animeList',
  initialState: {
    ...entityAdapter.getInitialState(),
    ...initialState,
  },
  reducers: {},
  extraReducers: builder => builder

    /** Cases for fetching an anime list. */
    .addCase(fetchAnimeList.pending, state => {
      state.isLoading = true;
    })
    .addCase(fetchAnimeList.fulfilled, (state, action) => {
      entityAdapter.setAll(state, action.payload.results);
      state.isLoading = false;
      state.nextPage = action.payload.next;
    })
    .addCase(fetchAnimeList.rejected, (state, action) => {
      if (action.error.message) {
        state.error = action.error.message;
      }
      state.isLoading = false;
    })

    /** Cases for fetching the next page of the anime list. */
    .addCase(fetchNextPageOfAnimeList.pending, state => {
      state.isLoading = true;
    })
    .addCase(fetchNextPageOfAnimeList.fulfilled, (state, action) => {
      entityAdapter.updateMany(state, action.payload.results);
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
