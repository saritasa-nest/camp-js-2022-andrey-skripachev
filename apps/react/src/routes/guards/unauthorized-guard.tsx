import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { fetchUser } from '@js-camp/react/store/user/dispatchers';
import { selectIsUserLoading, selectUser, selectUserError } from '@js-camp/react/store/user/selectors';

import { useAppDispatch, useAppSelector } from '../../store';
import { AppLoadingSpinner } from '../../app/components/AppLoading';

export const UnauthorizedGuard: FC = () => {
  const appDispatch = useAppDispatch();

  const user = useAppSelector(selectUser);
  const userError = useAppSelector(selectUserError);
  const isUserLoading = useAppSelector(selectIsUserLoading);

  if (user === null && userError) {
    return <Navigate to='/auth/login' replace />;
  }

  if (user === null && !isUserLoading) {
    appDispatch(fetchUser());
  }

  if (user === null) {
    return <AppLoadingSpinner />;
  }

  return <Outlet />;
};
