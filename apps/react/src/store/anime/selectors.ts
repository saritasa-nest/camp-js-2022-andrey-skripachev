import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

import { entityAdapter } from './state';

export const selectCurrentAnime = createSelector(
  (state: RootState) => state.anime.currentAnime,
  anime => anime,
);

export const selectAnimeFromStore = createSelector(
  (state: RootState) => entityAdapter.getSelectors().selectById(state.anime, state.anime.animeId ?? -1),
  anime => anime,
);

export const selectIsAnimeLoading = createSelector(
  (state: RootState) => state.anime.isLoading,
  isLoading => isLoading,
);

export const selectAnimeId = createSelector(
  (state: RootState) => state.anime.animeId,
  id => id,
);
