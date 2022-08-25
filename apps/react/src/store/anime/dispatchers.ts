import { createAsyncThunk } from '@reduxjs/toolkit';

import { AnimeService } from '../../api/services/animeApi';
import { addGenres } from '../genre/dispatchers';
import { addStudios } from '../studio/dispatchers';

export const setAnimeId = createAsyncThunk(
  'anime/set-anime',
  (id: string) => id,
);

export const fetchAnimeById = createAsyncThunk(
  'anime/get-by-id',
  async(id: string, { dispatch }) => {
    try {
      const anime = await AnimeService.getAnimeById(id);

      await dispatch(addGenres(anime.genresData))
      await dispatch(addStudios(anime.studiosData))

      return anime;
    } catch (error: unknown) {
      console.error(error);
      return null;
    }
  },
);
