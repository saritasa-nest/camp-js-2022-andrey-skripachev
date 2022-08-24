import { AnimeDetails } from '@js-camp/core/models/anime-details';
import { createEntityAdapter } from '@reduxjs/toolkit';

export const entityAdapter = createEntityAdapter<AnimeDetails>({
  selectId: anime => anime.id,
});

/** Anime state. */
export interface AnimeState {

  /** Error. */
  readonly error?: string;

  /** Whether anime is loading or not. */
  readonly isLoading: boolean;

  /** Current viewed anime id. */
  readonly animeId?: string;

  /** Current viewed anime. */
  readonly currentAnime?: AnimeDetails;
}

export const initialState: AnimeState = {
  isLoading: false,
};
