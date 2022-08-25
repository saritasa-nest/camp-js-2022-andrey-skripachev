import { createSelector, EntityId } from '@reduxjs/toolkit';

import { RootState } from '../store';

import { entityAdapter } from './state';
const { selectById } = entityAdapter.getSelectors();

export const selectAnimeFromStore = createSelector(
  (state: RootState, id: EntityId) => selectById(state.anime, id),
  anime => anime,
);

export const selectIsAnimeLoading = createSelector(
  (state: RootState) => state.anime.isLoading,
  isLoading => isLoading,
);
