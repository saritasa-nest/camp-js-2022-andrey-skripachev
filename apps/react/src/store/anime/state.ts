import { Anime } from '@js-camp/core/models/anime';

/** Anime list state. */
export interface AnimeListState {

  /** Anime list. */
  readonly animeList: Anime[];

  /** Error. */
  readonly error?: string;

  /** Whether anime list is loading or not. */
  readonly isLoading: boolean;
}

export const initialState: AnimeListState = {
  isLoading: false,
  animeList: [],
};
