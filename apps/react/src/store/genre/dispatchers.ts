import { Genre } from '@js-camp/core/models/genre';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const addGenres = createAsyncThunk(
  'genre/add',
  (genres: readonly Genre[]) => genres,
);
