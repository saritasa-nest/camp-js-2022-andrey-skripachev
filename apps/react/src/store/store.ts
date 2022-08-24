import { configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook, useDispatch, useSelector,
} from 'react-redux';

import { animeSlice } from './anime/slice';
import { animeListSlice } from './animeList/slice';
import { genreSlice } from './genre/slice';
import { studioSlice } from './studio/slice';
import { userSlice } from './user/slice';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    animeList: animeListSlice.reducer,
    anime: animeSlice.reducer,
    genre: genreSlice.reducer,
    studio: studioSlice.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    // We need to disable this check to allow ES6 classes in Redux.
    // You can find more info about this middleware in docs:
    // https://redux-toolkit.js.org/api/serializabilityMiddleware
    serializableCheck: false,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

/** Typed `useDispatch` hook. */
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
