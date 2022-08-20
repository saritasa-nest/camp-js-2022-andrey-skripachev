import { Anime } from '@js-camp/core/models/anime';
import { createEntityAdapter } from '@reduxjs/toolkit';

export const entityAdapter = createEntityAdapter<Anime>({
  selectId: anime => anime.id,
});

/** Anime list state. */
export interface AnimeListState {

  /** Anime list. */
  readonly animeList: Anime[];

  /** Error. */
  readonly error?: string;

  /** Whether anime list is loading or not. */
  readonly isLoading: boolean;

  /** Next page of anime list. */
  readonly nextPage: string | null;
}

export const initialState: AnimeListState = {
  isLoading: false,
  animeList: [],
  nextPage: null,
};

export type AnimeState = typeof initialState;
