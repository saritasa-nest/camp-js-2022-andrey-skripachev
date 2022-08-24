import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

import { entityAdapter } from './state';

export const selectGenres = createSelector(
  (state: RootState) => entityAdapter.getSelectors().selectAll(state.genre),
  genre => genre,
);
