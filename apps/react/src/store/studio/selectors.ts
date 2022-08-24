import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

import { entityAdapter } from './state';

export const selectStudios = createSelector(
  (state: RootState) => entityAdapter.getSelectors().selectAll(state.studio),
  studio => studio,
);
