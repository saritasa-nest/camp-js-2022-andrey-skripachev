import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

/** Selector for user. */
export const selectUser = createSelector(
  (state: RootState) => state.user.user,
  user => user,
);

/** Selector for showing that user is loading. */
export const selectAreUserLoading = createSelector(
  (state: RootState) => state.user.isLoading,
  isLoading => isLoading,
);

/** Selector for user error. */
export const selectUserError = createSelector(
  (state: RootState) => state.user.error,
  error => error,
);
