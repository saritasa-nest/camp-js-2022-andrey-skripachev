import { createAsyncThunk } from '@reduxjs/toolkit';

import { AnimeService } from '../../api/services/animeApi';

export const fetchAnimeList = createAsyncThunk(
  'anime/fetch',
  () => AnimeService.getFirstPageOfAnimeList(),
);

export const fetchNextPageOfAnimeList = createAsyncThunk(
  'anime/fetchNext',
  (nextUrl: string) => AnimeService.getAnimeList(nextUrl),
);
