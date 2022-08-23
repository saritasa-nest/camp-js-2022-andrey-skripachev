import { Anime } from '@js-camp/core/models/anime';
import { createEntityAdapter } from '@reduxjs/toolkit';

export const entityAdapter = createEntityAdapter<Anime>({
  selectId: anime => anime.id,
});

/** Anime list state. */
export interface AnimeListState {

  /** Error. */
  readonly error?: string;

  /** Whether anime list is loading or not. */
  readonly isLoading: boolean;

  /** Next page of anime list. */
  readonly nextPage: string | null;
}

export const initialState: AnimeListState = {
  isLoading: false,
  nextPage: null,
};

export type AnimeStateType = typeof initialState;
