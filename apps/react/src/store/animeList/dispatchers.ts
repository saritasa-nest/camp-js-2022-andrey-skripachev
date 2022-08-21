import { createAsyncThunk } from '@reduxjs/toolkit';

import { AnimeService } from '../../api/services/animeApi';

export const fetchAnimeList = createAsyncThunk(
  'anime/fetch',
  () => AnimeService.getFirstPageOfAnimeList(),
);
