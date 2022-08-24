import { createSlice } from '@reduxjs/toolkit';

import { addGenres } from './dispatchers';
import { entityAdapter, initialState } from './state';

export const genreSlice = createSlice({
  name: 'genre',
  initialState: {
    ...entityAdapter.getInitialState(),
    ...initialState,
  },
  reducers: {},
  extraReducers: builder => builder
    .addCase(addGenres.fulfilled, (state, action) => {
      entityAdapter.addMany(state, action.payload);
    }),
});
