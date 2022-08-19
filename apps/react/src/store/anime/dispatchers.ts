import { createAsyncThunk } from '@reduxjs/toolkit';

import { AnimeService } from '../../api/services/animeApi';

export const fetchAnime = createAsyncThunk(
  'anime/fetch',
  () => AnimeService.getFirstPageOfAnimeList(),
);
