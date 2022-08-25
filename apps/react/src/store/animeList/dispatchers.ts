import { QueryParams } from '@js-camp/core/models/query-params';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { AnimeService } from '../../api/services/anime';

export const fetchAnimeList = createAsyncThunk(
  'animeList/fetch',
  (searchParams: QueryParams) => AnimeService.getFirstPageOfAnimeList(searchParams),
);

export const fetchNextPageOfAnimeList = createAsyncThunk(
  'animeList/fetch-next',
  (url: string) => AnimeService.getAnimeList(url),
);
