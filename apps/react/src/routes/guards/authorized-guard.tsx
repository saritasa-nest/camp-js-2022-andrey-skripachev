import { selectUser } from '@js-camp/react/store/user/selectors';
import { FC } from 'react';
import { Navigate, Outlet, To, useLocation } from 'react-router-dom';

import { useAppSelector } from '../../store';

export const AuthGuard: FC = () => {
  const user = useAppSelector(selectUser);
  const location = useLocation();

  const redirect: To = {
    pathname: 'auth/login',
    search: new URLSearchParams({
      next: location.pathname,
    }).toString(),
  };

  if (!user) {
    return <Navigate to={redirect} replace />;
  }

  return <Outlet />;
};
