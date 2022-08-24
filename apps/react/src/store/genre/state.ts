import { Genre } from '@js-camp/core/models/genre';
import { createEntityAdapter } from '@reduxjs/toolkit';

export const entityAdapter = createEntityAdapter<Genre>({
  selectId: genre => genre.id,
});

/** Genre state. */
export interface GenreState {

  /** Error. */
  readonly error?: string;

  /** Whether the user is loading or not. */
  readonly isLoading: boolean;
}

export const initialState: GenreState = {
  isLoading: false,
};
