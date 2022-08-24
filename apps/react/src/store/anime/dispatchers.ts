import { createAsyncThunk } from '@reduxjs/toolkit';

import { AnimeService } from '../../api/services/animeApi';

export const setAnimeId = createAsyncThunk(
  'anime/set-anime',
  (id: string) => id,
);

export const fetchAnimeById = createAsyncThunk(
  'anime/get-by-id',
  (id: string) => AnimeService.getAnimeById(id),
);
