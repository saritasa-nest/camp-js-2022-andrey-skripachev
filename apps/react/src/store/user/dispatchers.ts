import { createAsyncThunk } from '@reduxjs/toolkit';

import { UserService } from '../../api/services/user';

export const fetchUser = createAsyncThunk(
  'user/fetch',
  () => UserService.getCurrentUser(),
);

export const logoutUser = createAsyncThunk(
  'user/logout',
  () => UserService.logout(),
);
