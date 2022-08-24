import { AppError } from '@js-camp/core/models/error-response';
import { UserValidationErrors } from '@js-camp/core/models/user-validation-errors';
import { createSlice } from '@reduxjs/toolkit';

import { fetchUser, loginUser, logoutUser, registerUser } from './dispatchers';
import { initialState } from './state';

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => builder

    /** Cases for fetching user. */
    .addCase(fetchUser.pending, state => {
      state.isLoading = true;
    })
    .addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    })
    .addCase(fetchUser.rejected, (state, action) => {
      if (action.error.message) {
        state.error = action.error.message;
      }
      state.isLoading = false;
    })

    /** Cases for logout user. */
    .addCase(logoutUser.fulfilled, state => {
      state.user = null;
    })

    /** Cases for authorize user. */
    .addCase(registerUser.fulfilled, (state, action) => {
      state.user = action.payload;
    })
    .addCase(registerUser.rejected, (state, action) => {
      state.authError = action.payload as AppError<UserValidationErrors>;
    })
    .addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload;
    })
    .addCase(loginUser.rejected, (state, action) => {
      state.authError = action.payload as AppError<UserValidationErrors>;
    }),
});
