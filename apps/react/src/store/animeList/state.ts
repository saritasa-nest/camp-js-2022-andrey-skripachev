import { Anime } from '@js-camp/core/models/anime';
import { QueryParams } from '@js-camp/core/models/query-params';
import { createEntityAdapter } from '@reduxjs/toolkit';

export const entityAdapter = createEntityAdapter<Anime>({
  selectId: anime => anime.id,
});

const initialSearchParams: QueryParams = {
  search: '',
};

/** Anime list state. */
export interface AnimeListState {

  /** Error. */
  readonly error?: string;

  /** Whether anime list is loading or not. */
  readonly isLoading: boolean;

  /** Next page of anime list. */
  readonly nextPage: string | null;

  /** Search params. */
  readonly searchParams: QueryParams;
}

export const initialState: AnimeListState = {
  isLoading: false,
  nextPage: null,
  searchParams: initialSearchParams,
};

export type AnimeStateType = typeof initialState;
