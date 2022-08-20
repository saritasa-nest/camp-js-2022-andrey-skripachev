import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

export const selectAnimeList = createSelector(
  (state: RootState) => state.animeList.animeList,
  animeList => animeList,
);

export const selectAreAnimeListLoading = createSelector(
  (state: RootState) => state.animeList.isLoading,
  isLoading => isLoading,
);

export const selectErrorAnimeList = createSelector(
  (state: RootState) => state.animeList.error,
  error => error,
);

export const selectAnimeListNextPage = createSelector(
  (state: RootState) => state.animeList.nextPage,
  page => page,
);
