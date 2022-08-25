import { QueryParams } from '@js-camp/core/models/query-params';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { AnimeService } from '../../api/services/anime';

export const fetchAnimeList = createAsyncThunk(
  'animeList/fetched',
  (queryParams: QueryParams) => AnimeService.getFirstPageOfAnimeList(queryParams),
);

export const fetchNextPageOfAnimeList = createAsyncThunk(
  'animeList/fetchedNext',
  (url: string) => AnimeService.getAnimeList(url),
);
