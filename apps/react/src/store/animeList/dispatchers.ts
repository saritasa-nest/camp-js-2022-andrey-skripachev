import { createAsyncThunk } from '@reduxjs/toolkit';

import { AnimeService } from '../../api/services/anime';

export const fetchAnimeList = createAsyncThunk(
  'anime/fetch',
  () => AnimeService.getFirstPageOfAnimeList(),
);
