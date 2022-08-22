import { createAsyncThunk } from '@reduxjs/toolkit';

import { AnimeService } from '../../api/services/animeApi';

export const fetchAnimeList = createAsyncThunk(
  'animeList/fetch',
  () => AnimeService.getFirstPageOfAnimeList(),
);

export const fetchNextPageOfAnimeList = createAsyncThunk(
  'animeList/fetch-next',
  (url: string) => AnimeService.getAnimeList(url),
);
