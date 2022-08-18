import { selectUser } from '@js-camp/react/store/user/selectors';
import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAppSelector } from '../../store';

export const AuthorizedGuard: FC = () => {

  const user = useAppSelector(selectUser);

  if (user !== null) {
    return <Navigate to="/genres" replace />;
  }

  return <Outlet />;
};
