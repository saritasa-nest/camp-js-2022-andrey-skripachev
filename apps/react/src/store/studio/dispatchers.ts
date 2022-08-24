import { Studio } from '@js-camp/core/models/studio';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const addStudios = createAsyncThunk(
  'studio/add-many',
  (studios: readonly Studio[]) => studios,
);
