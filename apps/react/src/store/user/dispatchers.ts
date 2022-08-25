
import { Login } from '@js-camp/core/models/login';
import { Registration } from '@js-camp/core/models/registration';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { UserService } from '../../api/services/user';

export const fetchUser = createAsyncThunk(
  'user/fetched',
  () => UserService.getCurrentUser(),
);

export const registerUser = createAsyncThunk(
  'user/registered',
  async(registrationData: Registration, { rejectWithValue }) => {
    try {
      const user = await UserService.register(registrationData);
      return user;
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  },
);

export const loginUser = createAsyncThunk(
  'user/logged',
  async(loginData: Login, { rejectWithValue }) => {
    try {
      const user = await UserService.login(loginData);

      return user;
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  },

);

export const logoutUser = createAsyncThunk(
  'user/loggedOut',
  () => UserService.logout(),
);
