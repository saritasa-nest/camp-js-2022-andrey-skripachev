import { createSlice } from '@reduxjs/toolkit';

import { addStudios } from './dispatchers';
import { entityAdapter, initialState } from './state';

export const studioSlice = createSlice({
  name: 'studio',
  initialState: {
    ...entityAdapter.getInitialState(),
    ...initialState,
  },
  reducers: {},
  extraReducers: builder => builder
    .addCase(addStudios.fulfilled, (state, action) => {
      entityAdapter.addMany(state, action.payload);
    }),
});
