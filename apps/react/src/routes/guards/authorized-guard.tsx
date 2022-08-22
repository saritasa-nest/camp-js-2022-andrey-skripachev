import { fetchUser } from '@js-camp/react/store/user/dispatchers';
import { selectIsUserLoading, selectUser } from '@js-camp/react/store/user/selectors';
import { FC, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { AppLoadingSpinner } from '../../app/components/AppLoading';

import { useAppDispatch, useAppSelector } from '../../store';

export const AuthorizedGuard: FC = () => {

  const appDispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const isLoading = useAppSelector(selectIsUserLoading);

  useEffect(() => {
    appDispatch(fetchUser());
  }, [appDispatch]);

  if (isLoading) {
    return (<AppLoadingSpinner />);
  }

  if (user !== null) {
    return <Navigate to="/anime" replace />;
  }

  return <Outlet />;
};
