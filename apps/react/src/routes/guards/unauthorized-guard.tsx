import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { selectUser } from '@js-camp/react/store/user/selectors';

import { AppLoadingSpinner } from '../../app/components/AppLoading';

import { useAppDispatch, useAppSelector } from '../../store';

export const UnauthorizedGuard: FC = () => {

  const user = useAppSelector(selectUser);

  if (user !== null) {
    return <Navigate to="/genres" replace />;
  }

  return <Outlet />;
};
